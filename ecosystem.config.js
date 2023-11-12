module.exports = {
  apps: [{
    name: "human-resources-api",
    script: "./bin/www",
    watch: true,
    max_memory_restart: '500M',
    exec_mode: 'cluster',
    instances: 1,
    cron_restart: "0 0 * * *",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
