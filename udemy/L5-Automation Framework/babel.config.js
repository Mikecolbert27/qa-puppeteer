module.export={
    presets:[
        [
            "@babel/preset-env",
            {
                target:{
                    node:"current"
                }
            }
        ]
    ],
    env: {
        test: {
          plugins: ["@babel/plugin-transform-runtime"]
        }
    }
}