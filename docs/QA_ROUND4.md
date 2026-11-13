# Round 4 验收记录

日期：2026-11-14；分支 feature/paw-points-round-4。未合并 main，未改 Production。

## 自动验证

`npm run lint`、`npm run typecheck`、`npm test`（34/34）、`npm run build`（43 个静态页面）全部通过；`git diff --check` 通过。

新增测试覆盖访客命令限制、退出保留、5 动作、重复 50 次点击不刷收益、全局每日上限与澳门换日、整数校验、兑换幂等及原子性、负余额拒绝、请求待审、取消仅退款一次、旧数据迁移和安全返回路由。回归覆盖原投票、商品、生日、奖励、QR、地图关联与旧 Virtual Pet；四语字典及渲染文案覆盖检查通过。

## 实际浏览器

Chrome 桌面及 390×844 手机视口，本地生产导出通过 Python HTTP 服务预览。

- 访客免费互动无收益；商品购买弹登录说明，提供登录/注册/跳过；登录恢复原房间。
- 退出隐藏账户余额；从指定 Luna 页面登录，切换注册仍保留 next，重新进入返回 Luna，旧账户余额保留。
- Pet / Play / Seek / Feed / Rest 五种反馈；前四动作共得 40 Affinity 和 40 Bond XP，Rest 无收益；场景切换/刷新保留，相关商品与猫咪一致。
- 旧账户 128 Credits → 兑换 10 Affinity 后 138 → 请求 1 分钟后 38（待猫咖批准）→ 取消后 138（已退款，无第二次取消入口）。流水完整。
- 简中、繁中、英文、葡语切换后标题/表单/状态/历史翻译生效。
- 手机房间和钱包 DOM clientWidth/scrollWidth 均 390，无横向溢出；修复动作变换覆盖居中定位的问题。截图见 screenshots/round4-desktop.png、round4-mobile.png、round4-wallet-mobile.png。

## 范围与待确认

没有参考网站 URL，对照待完成；未测真机 Safari/Android/微信。未执行不存在的视觉评分工具，不虚报评分。公开 Preview 的部署与访问状态以交付消息为准。无认证后台、跨设备同步、实际支付、真实预约或员工审批服务；全为本地演示。无真实动物控制，商品为概念示意。
