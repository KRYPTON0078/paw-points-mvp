# Paw Points 2.1｜GrokBot 与团队交接

来源：Codex｜更新：2026-11-13。范围：可演示的消费者网站；未建立真实经营后台或完整 Agent 系统。

## 交付状态

- 仓库：https://github.com/Knighty-hub-hit/paw-points-mvp
- 功能分支：`feature/paw-points-ux-2-1`，起点 `main@7d67770`。
- 现有生产地址：https://paw-points-mvp.vercel.app 。2.1 本轮不自动合并、不发布生产。预览和分支推送结果以交付消息为准。
- 验收、浏览器实测、截图与未测项目：[QA_2_1.md](QA_2_1.md)。

## 产品定位与决定

Paw Points 围绕猫咪个性、故事与粉丝关系组织发现、投票、陪伴、生日体验和 IP 商品。此次将首页改为暖白、鼠尾草绿、桃色的编辑式品牌页面，保留所有 2.0 核心规则。

所有猫、猫咖、社区照片与故事是演示内容。三个概念猫咖没有核实坐标或可访地址，因此地图使用插画坐标，助手不请求位置、不计算虚构距离。未确认合作的品牌仅用明确占位；没有获准直播源，因此展示离线状态，不模拟直播。照片用于示意，人物与经营主体未核实。

2.1 沿用 `paw-points-v2` 存储名和 version 2，避免重置演示历史。原六个商品 ID、价格和业务命令保留，新增磁贴与不可购买的饰品。没有接入付费 AI、支付、预约或直播服务。

## 架构与源码入口

| 文件 | 用途 |
| --- | --- |
| `src/app/[[...path]]/page.tsx` | 静态路由清单；新增实体页必须同步 generateStaticParams |
| `src/components/PawApp.tsx` | 客户端路由展示、四语言、导航、通知、footer、减少动效偏好 |
| `src/components/BrandHome.tsx` | 编辑式首页、文化、猫咪、社区、合作占位与直播发现 |
| `src/components/World.tsx` | 猫咖插画地图、列表、筛猫、店铺详情、故事与直播状态 |
| `src/components/Discovery.tsx` | Cat ID、CAT 101；原关注、签到、护照、照护与投票 |
| `src/components/Experiences.tsx` | 生日申请、商城、购物袋及模拟结算 |
| `src/components/Account.tsx` | 会员、积分、关系、订单、预约、券包与账本 |
| `src/components/PawGuide.tsx` / `src/lib/assistant.ts` | 本地问答、语音能力检测、AssistantAdapter 扩展接口 |
| `src/data/seed.ts` / `world.ts` / `info.ts` | 实体种子、编辑内容、品牌和政策草案 |
| `src/lib/catalog.ts` | 商品类别、颜色及组合筛选纯函数 |
| `src/lib/models.ts` / `config.ts` / `engine.ts` | 数据类型、规则和纯函数命令引擎 |
| `src/store/usePawStore.ts` | Zustand LocalStorage 持久化适配器 |
| `src/lib/i18n.ts` / `translations.json` | en 原文 key → 简中／繁中／葡语；新增动态内容需纳入翻译测试 |
| `src/components/QrEntry.tsx` / `src/lib/qr-entry.ts` | 扫码入口、PNG/SVG、EntryAnalytics 接口与本地记录 |
| `src/components/brand-world.css` | 2.1 语义色、间距、字体及响应式样式；覆盖基础 globals.css |

Next.js 16 App Router、React、TypeScript、Zustand、Motion、qrcode，`output: export`，静态文件在 `out/`。Node 22.x，npm 10.9.8。无服务器数据库或 API key。安装使用 lockfile：`npm ci`。

## 路由

| 路由 | 功能 |
| --- | --- |
| `/` | 品牌首页 |
| `/cats/`、`/cafes/` | 同一猫咖世界的地图／列表与筛选 |
| `/cats/{mochi,luna,milo,coco,nori}/` | 五只猫的独立 Cat ID |
| `/cafes/{paw-macau,garden-house,moon-room}/` | 三家概念猫咖与所属猫咪 |
| `/cat101/` | 免费投票、榜单与徽章 |
| `/birthday/` | 套餐、生日保存和申请 |
| `/shop/`、旧 `/menu/` | IP 商品商城，旧路径兼容；不含饮品点单 |
| `/profile/`、`/companion/`、`/rewards/` | 会员、关系、积分、券包与记录 |
| `/stories/`、`/stories/{sunbeam,moonlight,adventure}/` | 虚构故事列表与详情 |
| `/live/` | 获准外部频道入口；当前全部离线 |
| `/about/`、`/contact/`、`/privacy/`、`/terms/` | 品牌信息与演示政策草案，无虚构邮箱或提交后台 |
| `/enter/?cafe=pawbrew`、`/qr-generator/` | 保留猫咖别名、二维码生成与 PNG/SVG 导出 |

## 数据模型与持久化

- `Cafe`：id、名称、地点描述、地址核实说明、图片、插画位置；可选真实 coordinates/mapUrl，streamUrl 当前 null。
- `Cat`：稳定 id、性格／bio、cafeId、示例粉丝与种子票、CatIdentity。医疗状态可 verified/pending/not-provided，当前样例不代表真实认证。
- `MerchandiseProduct`：稳定 id、catId、价格、category、colorName、productType、availability、效果图类型、未来库存与分账字段。
- `DemoState`：用户、独立 PP 账本与逐猫 XP、关注和主猫、投票、购物袋、成交快照、生日申请、照护待履约记录、签到、券包、徽章、幂等命令记录。
- `paw-points-v2`：Zustand 状态。`paw-points-language`：四语言选择。`paw-qr-events`：最近最多 500 条本地扫码记录。
- 不同设备、浏览器或域名不共享状态；本地数据可被修改，不能作为真实交易或全球票数依据。

## 业务规则（引擎为准）

- Asia/Macau 日历天每天 3 张免费票；消费不买票，投票不增加 Bond XP。
- 首次关注一次性 +20 PP；取消再关注不重复发放；可多猫关注、各猫 XP 保留、单一主陪伴猫。
- 签到每天一次：+5 PP/+20 XP；模拟员工互动每猫每天一次：+10 PP/+30 XP。
- 照护每天最多 3 笔：按 MOP 发演示 PP、+5 XP，始终待员工履约；连续 3 周同猫到店 +40 XP。
- Bond 等级阈值 0/100/300/800 XP，与 PP 分开；消费不能购买关系等级。
- 商品模拟支付每 MOP +1 PP，不加 XP；结算保存成交时名称和单价；数量上限 20，Coming soon 商品在引擎层禁购。
- 生日套餐 399/699/999 MOP。提交仅为申请，无积分；用户显式模拟员工批准与付款后才发 PP，不能等同真实预约。
- 兑换校验余额、关系等级、防同猫同款重复；命令 ID 幂等；券和领养信息均为演示，无实际兑换或自动领养。

## GrokBot 八类扩展点（规划，尚未实现）

| 角色 | 可接入位置／建议接口 | 所需控制 |
| --- | --- | --- |
| Customer Support | `AssistantAdapter.answer` → 受控知识库问答 API | 用户明确同意后才发送问题；不能执行支付／账户动作 |
| Content & Marketing | world/info 内容 → CMS 草稿与翻译流程 | 人工审核真实性、版权、四语言后发布 |
| Cat IP Management | Cat/Cafe/Identity → 核验档案 API | 员工权限与审核记录，禁止自动写成已认证 |
| Event Operations | BirthdayBooking → 容量／审批 API | 服务端核实日期、名额；人工批准后才确认 |
| Commerce | MerchandiseProduct/Order → 库存／支付／物流 API | 服务端定价，幂等支付 webhook，隔离 Agent 与资金权限 |
| Community Growth | Vote/Badge/Relationship → VotingService/会员 API | 身份认证、服务端限票、防刷；不允许改票或售票 |
| Analytics | `EntryAnalytics.record` → 经同意的事件服务 | 最小采集、匿名化、保留期限，不上传整个本地状态 |
| Product & Engineering | 类型、测试、静态路由 → PR/CI | 最小仓库权限，代码审核；无直接生产部署权 |

以上为接口建议，不是已存在的线上端点。先用适配器隔离远程 I/O，继续保留纯业务测试；引入真实账户前补授权、服务端验证、迁移和审计。不给自动 Agent 无限制访问支付、客户数据或生产发布权限。

## 运行、审核与发布

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
# 静态预览
python3 -m http.server 3201 --bind 127.0.0.1 --directory out
```

Pages 的 main 工作流带 `/paw-points-mvp` basePath；Vercel 根路径不设置 GITHUB_PAGES。QR 默认生产域名为 `https://paw-points-mvp.vercel.app`；Preview 若需专用 QR，构建前显式设置 NEXT_PUBLIC_SITE_URL。新增猫咖入口需经批准上线后再打印。

本轮保留 main 和现有生产。后续先审核功能分支，获准后合并和部署；出现问题可回退先前部署，不删除浏览器状态。更改持久化 schema 时必须设计明确迁移，不能用清空数据代替。

## 已知边界与建议下一步

1. 先验收 2.1 界面及四语言措辞，再批准 PR／合并／生产发布。
2. 真机 Safari、Android Chrome、微信浏览器扫码与下载；语音授权、拒绝和失败场景仍待测。
3. 核实真实猫咖、动物信息、地址坐标、素材及合作授权，再替换概念内容；有获准直播源后接入频道。
4. 需要多人共享数据时再建身份、服务端数据库、限票和后台；Demo 的本地积分不是可用财产。
5. 真实支付、库存、预约、隐私条款和客服联系方式均未配置。先确认服务主体和运营流程，再做接口。

本机工作区的个人录音、PDF、AGENTS.md 和 qr-downloads 未纳入应用交付。
