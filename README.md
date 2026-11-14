# Paw Points 2.2

**Every Cat Has a Story. Every Fan Makes It Grow.**

猫咪 IP 与粉丝经济互动 Demo：发现猫咪 → Cat ID → CAT 101 投票 → 建立关系 → 生日体验 → IP 商品。咖啡、饮品点单及其积分规则已移除。

五家概念猫咖（Paw & Brew Macau、Garden House、The Moon Room、Taipa Cat Atelier、Coloane Cloud Club），演示用户 Alex，五位示例猫咪 Mochi、Luna、Milo、Coco、Nori。四语言：简体中文、繁体中文、English、Português（欧洲葡萄牙语）；语言选择跨页面和刷新保留。

2.1 新增品牌首页、猫咖插画地图与列表、故事、离线直播发现、品牌说明、商城组合筛选和 Paw Guide。核心积分、投票、生日预约及 2.0 本地历史继续保留。验收与截图见 [QA_2_1.md](docs/QA_2_1.md)，团队接手见 [GROKBOT_HANDOFF.md](docs/GROKBOT_HANDOFF.md)。

## Round 4 当前版本

新增访客/本机演示登录、五猫互动房间、亲密度兑换积分、店员引导体验申请与取消退款；完整四语，保留旧 PP/XP 和历史。入口 `/cat-room/`、`/credits/`、`/login/`、`/signup/`。

DEMO 参数：合资格互动 +10 Affinity/等量 Bond XP，每猫每动作每日一次、全账户每日 10 次；1 Affinity = 1 Credit，100 Credits = 申请 1 分钟体验。可兑换 Affinity 独立于累计 XP，兑换不降级。参数在 `src/lib/round4.ts`。所有账户、交易和申请均为浏览器本地模拟。

分支 `feature/paw-points-round-4`，不自动合并或发布 Production。最新验收见 [QA_ROUND4.md](docs/QA_ROUND4.md)，迁移与接手说明见 [GROKBOT_HANDOFF.md](docs/GROKBOT_HANDOFF.md)。以下保留历史版本说明。

## 2.2 Round 3 当前版本

新增照片式 2D 虚拟伙伴（四场景、四种互动、本地手记、零 PP/XP）、五店可拖动缩放地图、成功投票庆祝、粉丝贡献榜、八类商品概念图和积分说明弹窗。保留四语与旧本地数据。

- 伙伴：`/virtual-pet/mochi/`（其他四只猫同样可用）
- 粉丝榜：`/leaderboard/fans/`
- 新店：`/cafes/taipa-atelier/`、`/cafes/coloane-cloud/`
- 验收：[QA_2_2.md](docs/QA_2_2.md)；架构与团队交接：[GROKBOT_HANDOFF.md](docs/GROKBOT_HANDOFF.md)
- 功能分支：`feature/paw-points-round-3`，本轮不自动合并 main 或部署 Production。
- Vercel Preview：https://paw-points-mvp-git-feature-paw-points-round-3-knighty-hub-hit.vercel.app （跟随功能分支，访问权限由 Vercel 项目设置决定）

以下 2.1 说明保留作历史背景；当前功能以本节和 2.2 交接记录为准。仍为本浏览器演示，没有跨设备数据同步或真实交易。

## 本地运行

使用 Node.js 22.x、npm 10.9.8（与 package.json / lockfile 一致）。不需要 API key。

```sh
npm ci
npm run dev
# http://localhost:3000
npm test
npm run typecheck
npm run lint
npm run build
```

使用 Next.js App Router、TypeScript、Tailwind、Zustand、Motion、Lucide 和 qrcode。静态导出在 `out/`，不能通过 `next start` 提供静态导出；可用任意静态服务器托管 `out/`。

## 已实现

- 首页和 5 个猫咪独立护照，照片、品种、近似出生日期、故事、粉丝数、排名、分享、关注和主陪伴猫。
- CAT 101：按澳门日历天 3 张免费票、月赛季、倒计时、Top 3、完整榜单、粉丝徽章和历史票数。榜单 = 虚构种子票数 + 当前浏览器投票，明确不是全球排名。
- Paw Birthday：生日保存，399/699/999 MOP 套餐，日期、人数、猫咖、主题校验，申请编号和个人中心状态。申请不发 PP；个人中心显式模拟「员工批准及付款」后才发演示积分。
- IP Shop：8 件概念商品、6 个类别；按颜色、价格区间、实物／数字及供应状态组合筛选，保留猫咪筛选、详情弹窗、数量、购物袋、显式模拟结算、确认和订单历史。Coming soon 饰品不可购买。
- 首页包含品牌文化、精选猫咪、六项功能、样例社区照片、故事、概念猫咖、合作占位、离线直播与照护理念；合作、故事、地点和照片均明确标为样例。
- 猫咖世界：可选地图标记、店铺预览和详情、地图／列表切换，按猫咖、地点、性格、年龄筛猫；地图为插画，不提供未经验证的导航。
- Cat ID 增加所属猫咖、地址状态、伙伴照片和故事时间线；个人中心增加会员卡、积分及主陪伴猫关系卡。
- Paw Journal 三篇示例故事；Live Cat World 三家猫咖均离线，没有伪造直播；关于、联系、隐私和条款页面。
- Paw Guide：本地规则问答、建议问题、文字回退和可选浏览器语音输入；未连接真实 AI。猫咖缺少核实坐标，无法计算附近距离。
- 多猫关注／取消／切换主陪伴猫，保留各猫 XP。首次关注一次性 20 PP；模拟签到 20 XP / 5 PP；模拟员工核验互动 30 XP / 10 PP；模拟照护 5 XP 和按金额的演示 PP，状态始终待员工履约。
- 3 个连续周到店同猫 +40 XP；关系等级 0/100/300/800 XP。积分余额、独立 XP 账本、奖励兑换和券包。投票与商品消费不增加 XP，不能购买票数。
- 二维码猫咖入口 `/enter/?cafe=pawbrew` 和 `/qr-generator/`，可导出 PNG/SVG；兼容 Pages 子路径，四语言，本地扫码记录。
- 手机五项底部导航，生日、关系、奖励可从首页／个人中心／页脚进入，明确标注的 Demo 重置。

## 3 分钟演示

1. 首页切换四语言，打开 Mochi 的猫咪护照，查看「待核验／未提供」的示例健康信息。
2. 关注 Mochi，获得首次关注 20 PP，并成为主陪伴猫。
3. 在猫咪页模拟签到：+20 XP / +5 PP；同一天重复签到会被阻止。
4. 打开 CAT 101，给 Mochi 投票。余额立即减少，榜单票数和粉丝徽章更新；每天最多 3 票。
5. Paw Birthday 保存生日，选择套餐、未来日期、人数、主题并提交申请。记下申请号，确认没有新增 PP。
6. IP Shop 打开 Mochi Photo Cards，加入一件（MOP 58），确认模拟订单：+58 PP，不增加 XP。
7. Rewards 兑换 40 PP 的数字壁纸奖励，查看个人中心券包、商品订单、生日申请和积分账本。
8. 刷新后关注、投票、生日、订单、券包及余额保留。Profile 最底部可重置本次 Demo。
9. 可选：个人中心显式模拟生日审批与付款、模拟推荐核验；猫咪页模拟员工互动与远程照护。所有操作均为演示，无真实付款或履约。

## 规则和架构

| 文件 | 职责 |
|---|---|
| `src/lib/models.ts` | 用户、猫、身份、医疗状态、赛季、订单、券、账本等类型 |
| `src/lib/config.ts` | PP、XP、等级、每日投票／照护上限与主题 |
| `src/data/seed.ts` | 猫咪、商品、生日套餐与奖励配置 |
| `src/lib/engine.ts` | 独立纯函数业务状态转换、验证、幂等、防重复、余额校验 |
| `src/store/usePawStore.ts` | 浏览器持久化适配器 |
| `src/lib/i18n.ts` / `translations.json` | 四语言与翻译字典 |
| `src/lib/qr-entry.ts` | QR 链接与本地入口记录适配器 |

`VotingService` 可替换为数据库权威服务。订单保存成交时商品名与单价快照；预约、支付、履约、库存和收入分成字段为未来服务预留。所有日期上限与每日重置采用 Asia/Macau。照护每天最多 3 笔；签到每天全用户一次，互动每猫每天一次；推荐奖励演示一次。每次命令有唯一 ID，重复提交拒绝；奖励每猫每款仅兑换一次。

2.1 沿用 2.0 的 LocalStorage `paw-points-v2` 和 version 2，不重置历史；原有商品 ID 和价格保持。不会将更早的饮品订单转换为新积分。旧版存储不删除；语言使用 `paw-points-language`，二维码记录使用 `paw-qr-events`。

## 路由

`/`、`/cats/`、`/cats/{mochi,luna,milo,coco,nori}/`、`/cat101/`、`/birthday/`、`/shop/`、`/companion/`、`/rewards/`、`/profile/`、`/enter/`、`/qr-generator/`。

新增 `/cafes/`、`/cafes/{paw-macau,garden-house,moon-room}/`、`/stories/`、`/stories/{sunbeam,moonlight,adventure}/`、`/live/`、`/about/`、`/contact/`、`/privacy/`、`/terms/`。新增内容需同步静态路由生成清单。

旧 `/menu/` 兼容打开新 IP 商城，不再提供任何饮品订购。

## GitHub Pages / Vercel

仓库：https://github.com/Knighty-hub-hit/paw-points-mvp

本次功能分支：`feature/paw-points-ux-2-1`，基于 `main` 的 `7d67770`。本轮只推送分支，不自动合并或发布 Production。

现有线上 Demo：https://paw-points-mvp.vercel.app 。它与本分支版本分开管理；本地 2.1 完成不代表该地址已更新。

Pages 工作流 `.github/workflows/pages.yml` 在 `main` 更新或手动触发时导出并部署。Pages 构建：

```sh
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://knighty-hub-hit.github.io/paw-points-mvp npm run build
```

Pages 使用 `/paw-points-mvp` 子路径。二维码链接必须包含部署路径；打印前验证公网访问与手机试扫。

Vercel 配置：框架 Next.js，构建命令 `npm run build`，静态输出目录 `out`；不设置 `GITHUB_PAGES`。默认二维码域名为 `https://paw-points-mvp.vercel.app`；可用 `NEXT_PUBLIC_SITE_URL` 覆盖实际 HTTPS 地址并重新构建。预览二维码若未覆盖该值，仍会打开现有生产版本。新增概念猫咖入口要等 2.1 经批准上线后才能用于公开二维码。

## 已知边界

这是本地持久化 Demo，无真实身份账户、全局票数、支付、库存、配送、预约容量、员工后台或照护履约。不同设备的数据不会同步，用户可修改浏览器数据。积分、券与奖励不能用于实际消费；四级只解锁领养申请信息，不会自动领养。生日权益和商品效果图为概念演示；所有医疗字段明确为样例待核验／未提供，未宣称任何真实认证。

图片保存在 `public/cats/`，运行时不依赖外部图片网络。照片仅作示意，不是已核实的真实猫咖猫咪。来源：Unsplash 图片 ID `photo-1573865526739-10659fec78a5`、`photo-1514888286974-6c03e2ca1dba`、`photo-1533738363-b7f9aef128ce`、`photo-1511044568932-338cba0ad803`、`photo-1495360010541-f48722b34f7d`。正式商用前需核对素材权利和真实猫咖授权。

后续模块见 `ROADMAP.md`。本仓库只交付应用源码和示例猫图，不包含工作区私人录音、PDF 和个人资料。
