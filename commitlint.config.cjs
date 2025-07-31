// commitlint.config.cjs
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 可选：自定义规则
  rules: {
    "type-enum": [
      2, // 2 = error, 1 = warning
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档
        "style", // 格式（不影响代码运行）
        "refactor", // 重构
        "perf", // 性能优化
        "test", // 测试
        "build", // 构建系统
        "ci", // CI 配置
        "chore", // 其他杂项
        "revert", // 回滚
      ],
    ],
    "subject-min-length": [2, "always", 4], // 提交信息至少 5 个字符
    "subject-max-length": [2, "always", 100], // 最多 100 字符
  },
};
