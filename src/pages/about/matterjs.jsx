import { useEffect, useRef } from "react";
import Matter from "matter-js";

const TimescaleExample = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      Body,
      Events,
      Composite,
      Composites,
      Common,
      MouseConstraint,
      Mouse,
      Bodies,
    } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 1000,
        height: 600,
        // showAngleIndicator: true,
        wireframes: false,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Static boundaries
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    const bodyOptions = {
      frictionAir: 0,
      friction: 0.0001,
      restitution: 0.8,
    };

    // // Add circles
    // Composite.add(
    //   world,
    //   Composites.stack(20, 100, 15, 3, 20, 40, (x, y) => {
    //     return Bodies.circle(x, y, Common.random(10, 20), bodyOptions);
    //   })
    // );

    // // Add random rectangles/polygons
    // Composite.add(
    //   world,
    //   Composites.stack(50, 50, 8, 3, 0, 0, (x, y) => {
    //     switch (Math.round(Common.random(0, 1))) {
    //       case 0:
    //         if (Common.random() < 0.8) {
    //           return Bodies.rectangle(
    //             x,
    //             y,
    //             Common.random(20, 50),
    //             Common.random(20, 50),
    //             bodyOptions
    //           );
    //         } else {
    //           return Bodies.rectangle(
    //             x,
    //             y,
    //             Common.random(80, 120),
    //             Common.random(20, 30),
    //             bodyOptions
    //           );
    //         }
    //       case 1:
    //         return Bodies.polygon(
    //           x,
    //           y,
    //           Math.round(Common.random(4, 8)),
    //           Common.random(20, 50),
    //           bodyOptions
    //         );
    //     }
    //   })
    // );

    const textures = [
      { texture: "/logo-black.png", w: 50, h: 30 },
      { texture: "/logo-white.png", w: 40, h: 20 },
    ];

    Composite.add(
      world,
      Composites.stack(50, 50, 10, 2, 10, 10, (x, y) => {
        const tex = Common.choose(textures);

        const width = tex.w * 0.3; // skala fisik (ubah sesuai keinginan)
        const height = tex.h * 0.3;

        return Bodies.rectangle(x, y, width, height, {
          ...bodyOptions,
          render: {
            sprite: {
              texture: tex.texture,
              xScale: width / tex.w,
              yScale: height / tex.h,
            },
          },
        });
      })
    );

    // Explosion logic
    const explosion = (engine, delta) => {
      const timeScale = 1000 / 60 / delta;
      const bodies = Composite.allBodies(engine.world);

      for (const body of bodies) {
        if (!body.isStatic && body.position.y >= 500) {
          const forceMagnitude = 0.05 * body.mass * timeScale;
          Body.applyForce(body, body.position, {
            x:
              (forceMagnitude + Common.random() * forceMagnitude) *
              Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude,
          });
        }
      }
    };

    let timeScaleTarget = 1;
    let lastTime = Common.now();

    // Time scaling & periodic explosion
    Events.on(engine, "afterUpdate", (event) => {
      const deltaTime = (event.delta || 1000 / 60) / 1000;
      engine.timing.timeScale +=
        (timeScaleTarget - engine.timing.timeScale) * 12 * deltaTime;

      if (Common.now() - lastTime >= 2000) {
        timeScaleTarget = timeScaleTarget < 1 ? 1 : 0;
        explosion(engine, event.delta);
        lastTime = Common.now();
      }
    });

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Fit viewport
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    // Cleanup on unmount
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default TimescaleExample;
