# VizML：机器学习算法可视化平台

VizML 是一个面向机器学习教学与交互演示的 Web 应用。项目使用 Flask 提供页面和 REST API，使用 scikit-learn 等库完成数据生成、模型训练和评估，并通过原生 HTML、CSS、JavaScript 与 Canvas/图表库展示决策边界、训练过程、聚类结果、回归曲线和降维效果。

本项目适合用于：

- 直观理解常见机器学习算法的工作方式；
- 调整超参数并观察模型行为变化；
- 比较多种算法或优化器的效果；
- 学习 Flask 与 scikit-learn 的轻量级集成方式。

> 当前仓库是 **Flask + 原生前端** 的单体应用，不需要 Node.js，也没有 Vue/Vite 构建步骤。

## 功能概览

- 生成分类、回归、聚类和高维演示数据；
- 使用交互式控件配置模型与训练参数；
- 展示训练集/测试集指标、预测结果和混淆矩阵；
- 线性回归提供“引导学习 / 自由实验”双模式，可分步探索斜率与截距、残差、损失地形、梯度下降和泛化；
- 线性回归自由实验支持上传 `.xlsx`、预览工作表、自定义选择多个特征和目标列；
- 可视化二维分类决策边界、支持向量、近邻和决策路径；
- 单步观察 K-Means、DBSCAN、神经网络与 SGD 的训练过程；
- 比较聚类、降维和 SGD 优化器；
- 展示集成模型的基学习器、特征重要性和决策边界；
- 提供统一 JSON API，便于扩展页面或接入其他客户端。

## 支持的算法

| 类别 | 算法与能力 |
| --- | --- |
| 分类 | 支持向量机（SVM）、K 近邻（KNN）、决策树、高斯朴素贝叶斯 |
| 回归 | 线性回归、岭回归、Lasso、多项式回归、正规方程、SGD 回归 |
| 聚类 | K-Means、DBSCAN、层次聚类、高斯混合模型（GMM） |
| 神经网络 | 单层感知机、MLP 分类、训练历史和分步训练 |
| 集成学习 | 随机森林、AdaBoost、梯度提升、Voting、Stacking、Bagging、XGBoost |
| 降维 | PCA、t-SNE、LDA、UMAP |
| 优化器 | SGD、Momentum、AdaGrad、RMSprop、Adam、Nesterov |
| 强化学习 | Q-Learning：空房间网格、悬崖漫步、小迷宫、有风网格世界；支持逐阶段策略、价值热力和轨迹回放 |

UMAP 和 XGBoost 分别依赖 `umap-learn` 与 `xgboost`，二者已列入 `requirements.txt`。UMAP 未成功安装时，其余降维算法仍可使用。

## 技术栈

- Python 3.8+
- Flask 2.3.3、Flask-CORS
- scikit-learn 1.3.0
- NumPy、Pandas、SciPy
- Matplotlib、Seaborn
- UMAP、XGBoost
- 原生 HTML5、CSS3、JavaScript、Fetch API、Canvas
- Chart.js、Plotly.js（固定版本并由 Flask 本地托管）

## 快速开始

### 1. 获取代码

```bash
git clone https://github.com/xuke225/VizML.git
cd VizML
```

如果已经取得项目目录，直接进入目录即可。

### 2. 创建环境并安装依赖

推荐使用项目自带启动器：

```bash
python3 start.py --setup
```

该命令会在项目根目录创建 `.venv`，并根据 `requirements.txt` 安装依赖。

也可以手动创建虚拟环境。

macOS / Linux：

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Windows PowerShell：

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 3. 启动应用

```bash
python start.py
```

打开 <http://localhost:5432> 即可进入首页。

> **端口说明：** 后端、前端 API 客户端和启动脚本统一使用 `5432` 端口。

### 4. 其他启动命令

```bash
# 调试模式
python start.py --debug

# 仅安装 requirements.txt 中的依赖（要求 .venv 已存在）
python start.py --install

# 查看 Python、操作系统和虚拟环境信息
python start.py --info
```

如果已经激活虚拟环境，也可以直接运行 Flask 应用：

macOS / Linux：

```bash
PORT=5432 python app.py
```

Windows PowerShell：

```powershell
$env:PORT = "5432"
python app.py
```

## 使用流程

1. 从首页选择一个算法模块；
2. 选择数据类型、样本数量、噪声和随机种子并生成数据；
3. 调整算法参数并开始训练；
4. 查看指标、决策边界、曲线或训练历史；
5. 在支持交互预测的页面点击画布或输入新样本；
6. 使用重置功能重新生成数据并比较其他参数。

线性回归页面默认进入“引导学习”，包含四个连续实验和即时理解检查；需要直接配置数据集、回归算法和优化器时，可切换到“自由实验”。自由实验支持不超过 5 MB 的 `.xlsx` 文件：第一行作为列名，上传后选择工作表、一个或多个数值特征列以及一个目标列即可导入。页面同时提供可下载的房价示例文件。

### Excel 多元回归示例

示例文件位于 [`frontend/static/examples/linear_regression_example.xlsx`](frontend/static/examples/linear_regression_example.xlsx)，包含“房屋面积、房龄、距市中心距离、房价”四列。在自由实验页面点击“使用示例数据”，确认前三列为特征、房价为目标，导入后点击“开始训练”，即可查看真实值与预测值、残差和模型系数。

所有算法页面也可以直接访问：

| 页面 | 地址 |
| --- | --- |
| 线性回归 | `/html/linear_regression.html` |
| SGD | `/html/sgd.html` |
| SVM | `/html/svm.html` |
| KNN | `/html/knn.html` |
| 决策树 | `/html/decision_tree.html` |
| 贝叶斯分类 | `/html/bayesian_classification.html` |
| 聚类 | `/html/clustering.html` |
| 神经网络 | `/html/neural_network.html` |
| 集成学习 | `/html/ensemble.html` |
| 降维 | `/html/dimensionality_reduction.html` |

例如：<http://localhost:5432/html/svm.html>。

## 可用数据

数据由 `backend/data_generator.py` 生成或从 scikit-learn 内置数据集加载。

- 分类数据：`blobs`、`circles`、`moons`、`gaussian`、`s_curve`、`xor`、`spiral`、`checkerboard`、`multi_cluster`、`imbalanced`、`linear_separable`、`classification`、`random`；
- 分类内置数据：Iris、Wine、Breast Cancer、Digits、Diabetes（根据页面需要截取、降维或转换标签）；
- 回归数据：线性、二次、三次、多项式、正弦/余弦、衰减正弦、复合函数、螺旋、多峰、阶跃、锯齿、分段线性、异方差、异常值、指数和对数数据；
- 回归自定义数据：可上传 `.xlsx`，无效数值行会在导入时过滤并提示；
- 聚类数据：`blobs`、`circles`、`moons`、`anisotropic`、`varied`、`smiley`、`petals`，也支持前端手绘点；
- 高维数据：Iris、Wine、Breast Cancer、Digits，以及可配置的合成高维分类数据。

## ML Arena — 机器学习模型竞技场

本地打开 `http://localhost:5432/#ml-arena`。可从 SVM、KNN、决策树、随机森林、神经网络、高斯朴素贝叶斯中任选 2～6 个模型 PK，默认全部参赛。只创建、训练和展示选中的模型，每个参赛模型对应一块画布；桌面按人数自动排列，平板最多两列，手机单列。围绕同一份数据的真实决策边界进行实验，不使用预设边界或虚构训练动画。首页原有 11 个算法实验室保持独立。

1. 选择月牙、圆环、XOR，或自由绘制 A/B 两类；样本数 24～600、每类至少 6 个。
2. 在“参赛算法”勾选至少两个算法，点击“开始 N 模型对决”。参赛模型统一计算并同步显示，共用同一分层划分；选择算法不改变样本或留出划分，标准化只拟合训练集，神经网络始终标准化。
3. 拖动实心训练点，重新对决，观察参赛模型的边界同时变化。悬停联动；点击空心测试点检查真实预测、KNN 邻居、树路径及 SVM 决策分数。
4. 可添加、删除、换类、清空及撤销最近 30 次编辑。坐标变动不会改变成员划分；增删、换类、改变种子或留出比例时重新分层划分。
5. 噪声和错误标签挑战仅影响训练集。预览修改立即标记旧结果过期，重新训练后才能使用预测。调整挑战时先重置挑战再手动编辑原始数据。
6. 第一轮自动保存为基线，也可另设基线。测试集指纹一致时可开启共同分割线，对比参赛模型前后边界及 Macro F1 差值；测试样本坐标、成员或标签改变时重新建立基线。切换阵容会暂停并清空旧演示、快照、完整结果备份及基线，使旧边界失效；重新运行后只对当前阵容排名。

### 详细数据折叠与画布同屏

每个模型的“实验数据与过程详情”默认收起，里面保留完整指标、实测耗时、过程说明、损失曲线、投票、样本解释以及实际参数。可单独点击展开 / 收起（支持键盘 Enter / 空格），或使用“全部展开数据 / 全部收起数据”。折叠不重新训练、不丢失数据、不暂停播放，隐藏的数据继续更新；展开后显示当前阶段，而非折叠时的旧值。

点击“N 画布同屏”会收起当前参赛算法的数据，自动定位到画布区，并根据窗口高度、实际列数、固定页头及折叠栏高度调整画布。在桌面与平板的已验证尺寸（包括 1821×866、1366×768、1280×720、900×768）下，全选六模型可完整显示六张画布及折叠按钮。桌面 2 / 3 个模型一排，4 个模型两列两排，5 / 6 个模型三列两排；窗口变化后重新适配。手机仍为可读的单列，按钮改为“定位模型画布”，不把六张图强行缩进小屏。

边界来自统一坐标 `[-3,3]²`、120×120 网格的真实 `predict`；完整对决的显示过渡仅用于显现已计算结果，过程观察则计算下述真实阶段。训练点实心、测试点空心、测试误判橙色叉圈、污染标签菱形。挑战噪声超出画布会限幅至 ±2.95 并提示数量。

排名以测试集 Macro F1 为主，Accuracy 破同分，均相同则并列；同时提供宏平均 Precision / Recall、训练准确率及实际拟合耗时。耗时不参与排名。结果只适用于本次数据和参数，不代表算法绝对优劣。训练准确率针对实际训练标签（含污染），测试指标始终针对干净测试标签。

### 六模型的完整原实验参数

原实验室与竞技场共同使用 `backend/model_parameters.py:create_classifier` 创建分类器；不重复调用各实验室自行划分数据的完整训练流程。竞技场右侧读取同文件参数目录，未参赛算法的参数保留但禁用，不参与校验、训练或排名。

| 模型 | 已接入设置 |
| --- | --- |
| SVM | linear / RBF / poly / sigmoid；C；数值、scale、auto Gamma；degree、coef0、max_iter、tol、标准化 |
| KNN | K；欧氏、曼哈顿、闵可夫斯基、切比雪夫距离；p；等权/距离投票；标准化 |
| 决策树 | 深度（可不限）、最少分裂样本、叶节点最少样本、全部/sqrt/log2 特征、Gini/熵、标准化 |
| 随机森林 | 树数量、深度（可不限）、最少分裂样本、叶节点最少样本、sqrt/log2/auto/全部特征 |
| 神经网络 | 单层感知机 / MLP；一、二、三、五层与自定义结构；ReLU/Tanh/Sigmoid；Adam/SGD/L-BFGS；学习率、迭代、L2、批大小 |
| 高斯贝叶斯 | 连续方差平滑、自定义/自动先验、标准化 |

参数名采用原实验室名称（如 `n_neighbors`、`max_depth`、`hidden_layer_sizes`）。与当前核函数、网络类型或求解器无关的设置按条件禁用，不假装生效。类别测试比例在公共面板统一设为 10%～50%，不能让各模型分别拆分数据。竞技场仍只处理二维分类；原决策树的高维数据选择不属于此处的模型参数。

每块画布在“实验数据与过程详情”内可展开“本轮实际生效参数”，查看 `configured_params`、实际 sklearn `effective_params` 和训练集预处理信息。模型参数改变立即使参赛模型结果过期。参赛模型的未知参数直接报错，不静默忽略；保留初版 API 的 k/depth/leaf/trees/width/layers/iterations/smoothing 别名，但不能与同义新字段同时发送。

随机森林按各树类别概率均值预测，不把硬投票计数伪装成最终规则。MLP 的结构、迭代与损失来自真实拟合；L-BFGS 没有逐轮损失曲线时返回空列表；单层感知机只显示决策分数，不伪造概率或交叉熵损失。标准化的树路径阈值换回原坐标后显示。原 SVM 实验中曾被忽略的 max_iter / tol 已真正传给 SVC；Gamma scale 由模型在训练输入上计算，不读取测试集方差。

### 逐步观察学习过程

共享数据画布下方点击“第 1 步”“第 10 步”“第 50 步”，也可前进 1 / 10 步或输入目标步数（1～10000）。不必先运行完整对决。参赛画布同步切换到同一目标步的实际阶段，每种机制的进度单位、上限和说明分别展示。不会用两张边界插值冒充优化过程。

| 模型 | 每一步的实际含义 |
| --- | --- |
| MLP（Adam / SGD）、感知机 | `partial_fit` 完整遍历训练集一轮，保留优化器状态；MLP 展示真实逐轮训练损失与权重范数，感知机无交叉熵曲线。累计轮数按实际调用次数计数（sklearn 1.3 每次调用的 n_iter_ 会重置为 1）。固定轮数增量模式，不承诺与完整 fit 的停止策略一致。 |
| SVM、MLP（L-BFGS） | 相同起点，分别用 max_iter=1、10 等预算独立重新求解；显示实际迭代次数。求解器不支持该接口下断点续训，明确不称作续训；SVM 圆环标出真实支持向量，L-BFGS 不伪造逐轮损失。 |
| 随机森林 | 固定种子下前 N 棵真实树的集成，概率平均而非硬投票；达到右侧设定树数后保持结果。 |
| 决策树 | 先训练完整树，再按前序逐个展开真实分裂节点；未展开节点用该节点类别分布预测，橙线标出最近展开的切分。是结构解释，不是训练迭代；全部展开后与原树一致。 |
| KNN | 点击样本，逐个显示真实邻居及部分距离加权 / 等权投票。背景一直是完整 K 的决策边界，因为 KNN 不存在迭代训练；不会用前 N 邻居替换右侧 K 参数。 |
| 高斯贝叶斯 | 每批 8 个训练样本，累积重新估计均值、方差、先验；优先纳入每类最多两个样本。淡点尚未参与估计，椭圆是各类均值 ±1 标准差，不是置信区间；标准化启用时固定使用整个训练池拟合的尺度。全部批次后与完整训练统计一致。 |

各模型达到各自配置的上限后不再推进。不同模型的“步”不是同一种计算量，过程模式不排名、不改写完整对决或基线。测试集固定且不参与拟合；“训练池 Accuracy / Log loss”对整个训练池评估，贝叶斯早期包含尚未参与估计的样本，Log loss 不意味着这些模型都用梯度优化。非神经网络的折线只连接实际访问过的快照评估值，不宣称记录了中间优化轨迹。

最近 16 个已访问快照保存在当前浏览器内存，可直接回看，无需重新请求。点击“返回完整对决”恢复独立保存的完整拟合结果；修改数据、模型参数、种子、划分或挑战会立即清空快照并使旧边界失效，迟到响应不能覆盖新状态。刷新不保留快照。对于增量训练，每次请求都从相同种子重放至目标轮次，不在服务器保存跨用户训练状态。

算法接口依据当前安装的 scikit-learn 1.3 行为；参考官方 [MLPClassifier.partial_fit](https://scikit-learn.org/1.3/modules/generated/sklearn.neural_network.MLPClassifier.html#sklearn.neural_network.MLPClassifier.partial_fit) 和 [SVC 的迭代预算及状态](https://scikit-learn.org/1.3/modules/generated/sklearn.svm.SVC.html)。

### 按实测时间连续播放、暂停和实时变速

“逐步观察”下方点击“记录并播放”：只记录当前参赛模型的实际步骤和耗时，再独立沿同一实测时间轴回放对应画布。各模型不同步数、不同进度是正常现象；耗时是本机本轮测量值，多轨叠置不代表后端并行训练，不用它们做绝对速度排名。

- “暂停 / 继续播放”冻结 / 恢复同一演示时间及各模型进度；后台标签页自动暂停，返回后手动继续。
- 数字输入或对数滑块实时调整速度倍率，范围 `0.00001×～10×`，默认 `0.001×`（放慢 1000 倍）。`演示时长 = 实测耗时 ÷ 倍率`，1× 是原速。变速不会重训、跳回起点或重置当前步骤，暂停中也可调整后再继续。
- 时间轴可拖到任意实测时间，精确显示各模型在该时刻最后一个已完成的阶段；拖动后保持暂停。“从头播放”使用已记录片段，不发起训练请求。选择单步快照或“返回完整对决”会退出连续播放，保留录制片段供重播。
- 每次记录前 1～200 步（默认 50）；每种算法达到自身上限后提前停止，片段结束不等于收敛。更大步数仍可使用原有的单步观察。修改数据、参数、种子、划分或挑战会立即清空片段并阻止旧响应覆盖。
- 每块画布单列实测准备耗时、本步耗时与累计耗时。网格预测、评估、解释编码、网络等待及绘图不进入演示时钟，不从两次累计拟合耗时相减来伪造单步耗时，也不人为设置固定最小停留时长。极快步骤可能被浏览器刷新跨过，应进一步降低倍率观察。
- 神经网络每步真实 `partial_fit`；森林用 `warm_start` 每步增加一棵树并记录实际调用耗时。SVM / L-BFGS 每步为一个独立预算拟合的**完整耗时**，不是不可见的内部第 N 次迭代耗时。决策树的完整训练、KNN 建立索引与查询全部展示样本的邻居计入准备阶段，各步分别计量结构展开、部分投票；不把解释操作说成训练优化。

记录阶段可“取消记录”；浏览器会中止等待并忽略迟到结果，但已在 sklearn 中开始的计算可能仍在服务器完成。边界用位打包传输、仅按需解码参赛模型的当前帧；回放不重新训练，也不在边界之间做假插值。刷新页面不会保存录制片段。

### API 与验证

独立、无状态的 `backend/arena/` 不使用原实验室全局会话。浏览器刷新会清空当前实验，不保存历史或账户。

- `GET /api/arena/parameters`：与原实验共用的完整字段、选项、默认值和生效条件。
- `POST /api/arena/generate`：`{kind,count,noise,seed}`，生成真实二维样本。
- `POST /api/arena/prepare`：预览共同划分与训练挑战，不训练。
- `POST /api/arena/run`：统一训练所选模型并返回网格、预测、指标、真实解释。
- `POST /api/arena/observe`：相同输入增加 `step`，返回六种真实阶段、说明、实际参数、网格、诊断指标和可视化数据；`ranks={}`，不参与排名。
- `POST /api/arena/timeline`：相同输入增加 `steps`（1～200），返回参赛模型各轨的 `setup_ms`、各帧 `duration_ms / elapsed_ms`、真实模型状态和 `packbits_base64_big` 网格。此接口只记录，不使用浏览器倍率影响测量；倍率与暂停完全由前端时钟控制。

数据与训练接口输入 `{points:[{id,x,y,label}],seed,test_size,params,challenge,version}`；标签为 0/1，ID 唯一；`challenge={noise,corruption}`。`run / observe / timeline` 可增加 `selected_models`（2～6 个不同的 svm/knn/tree/forest/mlp/bayes，省略则全部参赛），返回的 `model_keys`、模型、排名或轨迹只包含所选算法，未知、重复或不足两个会明确报错。固定 ID/标签/种子/比例决定划分，坐标编辑不改变划分。训练污染在划分后执行，原始标签和测试样本保持不变。请求上限 180KB，固定 120² 网格和 600 个样本；不在鼠标移动时训练。竞技场保留明确的本地计算上限：K≤31、SVM C≤1000 / 最大迭代≤10000、决策树有限深度≤15、随机森林 3～120 棵 / 有限深度≤20（树均可选不限深度）、神经网络最大迭代≤2000。Arena 自定义网络最多 8 层、每层≤256、合计≤1024 单元，原实验室 API 不受该 Arena 专用网络上限影响。超限明确报错，不截断；指定批大小不得超过训练样本数。所有结果带数据版本，旧请求不能覆盖修改后的数据。

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
node --check frontend/static/js/ml-arena.js
# 已安装 Playwright 时，启动 Flask 后执行：
node tests/browser_arena.cjs
node tests/browser_arena_parameters.cjs
node tests/browser_arena_observation.cjs
node tests/test_arena_timeline_clock.cjs
node tests/browser_arena_timeline.cjs
node tests/browser_arena_layout_selection.cjs
```

浏览器测试可通过 `NODE_PATH` 指向已有 Playwright，`ARENA_BROWSER_EXE` 指定 Chromium / Edge。截图输出到忽略提交的 `.arena-qa/`。

不包含额外的 AdaBoost / 梯度提升模型、回归或聚类赛道、账户、历史排行榜或自动关卡。仅本地开发，不自动提交或推送。

## 项目结构

```text
VizML/
├── app.py                         # Flask 应用、页面路由和全部 API
├── start.py                       # 环境检查、依赖安装和服务启动器
├── run.sh                         # macOS/Linux 快捷启动脚本
├── requirements.txt               # Python 依赖
├── README.md                      # 项目使用说明
├── version.md                     # 当前版本与更新记录
├── .gitignore                     # Git 忽略规则
├── backend/
│   ├── data_generator.py          # 合成/内置数据集生成与参数推荐
│   └── algorithms/
│       ├── base.py                # 算法基类、评估与可视化公共能力
│       ├── svm.py
│       ├── knn.py
│       ├── decision_tree.py
│       ├── bayesian_classification.py
│       ├── linear_regression.py
│       ├── sgd.py
│       ├── clustering.py
│       ├── neural_network.py
│       ├── ensemble.py
│       └── dimensionality_reduction.py
└── frontend/
    ├── templates/                  # 首页与各算法的独立 HTML 页面
    └── static/
        ├── css/design-system.css   # 全站设计系统与响应式主题
        ├── js/api-client.js        # API 客户端和通用可视化工具
        ├── js/ui-shell.js          # 共享品牌栏和页面增强
        ├── js/visualization-theme.js # 统一图表色板与绘图工具
        └── vendor/                 # 本地 Chart.js、Plotly 及许可证
```

## 系统工作方式

典型请求链路如下：

```text
浏览器页面
   │
   ├─ POST /api/generate_data ──> 生成数据并返回 session_key
   │
   ├─ POST /api/<algorithm>/train ──> 训练模型并返回 model_key
   │
   └─ POST /api/<algorithm>/predict ──> 使用 model_key 预测新样本
                                      │
                                      └─ JSON 结果交给页面绘制
```

`app.py` 使用全局 `session_data` 字典保存：

- `datasets`：由 `session_key` 标识的数据集；
- `models`：由 `model_key` 标识的已训练模型及结果；
- `scalers`：训练时使用的特征缩放器；
- `training_history`：需要分步展示的训练状态。

这些数据只存在于当前 Python 进程中，服务重启后会全部丢失。

## API 使用

本文示例统一使用 `http://localhost:5432`。请求和响应均使用 JSON。成功响应通常包含 `status: "success"`；参数、数据或模型无效时通常返回 HTTP 400；资源不存在时返回 HTTP 404。

### 生成数据

```http
POST /api/generate_data
Content-Type: application/json
```

示例：

```bash
curl -X POST http://localhost:5432/api/generate_data \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "classification",
    "shape": "moons",
    "n_samples": 200,
    "n_classes": 2,
    "noise": 0.15,
    "random_state": 42
  }'
```

响应中的 `session_key` 用于后续训练请求。当前键由数据类型和形状组合而成；再次生成同类型、同形状的数据会覆盖原数据。

### 训练模型

大部分监督学习接口遵循以下结构：

```bash
curl -X POST http://localhost:5432/api/svm/train \
  -H 'Content-Type: application/json' \
  -d '{
    "session_key": "classification_moons",
    "params": {
      "kernel": "rbf",
      "C": 1.0,
      "gamma": "scale",
      "scale_features": true
    }
  }'
```

聚类和集成学习接口还需要顶层 `algorithm` 字段。成功训练后返回的 `model_key` 用于预测、决策路径或详情查询。

### 预测新样本

```bash
curl -X POST http://localhost:5432/api/svm/predict \
  -H 'Content-Type: application/json' \
  -d '{
    "model_key": "svm_classification_moons",
    "X": [[0.25, 0.50], [1.20, -0.10]]
  }'
```

`X` 必须是二维数组，并且特征数量应与训练数据一致。

### API 一览

| 模块 | 方法与路径 | 用途 |
| --- | --- | --- |
| 页面 | `GET /`、`GET /html/<path:filename>` | 首页与算法页面 |
| 数据 | `POST /api/generate_data` | 生成分类、回归或聚类数据 |
| 数据 | `POST /api/generate_full_dimensional_data` | 生成决策树所用完整维度数据 |
| 数据 | `GET /api/data/get_available_types` | 查询可用数据类型 |
| 数据 | `POST /api/data/get_description` | 查询数据说明 |
| 数据 | `POST /api/data/get_recommended_params` | 查询推荐参数 |
| 聚类 | `POST /api/clustering/train` | 训练单个聚类模型 |
| 聚类 | `POST /api/clustering/compare` | 比较多个聚类算法 |
| 聚类 | `POST /api/clustering/kmeans/debug_init` | 初始化 K-Means 单步演示 |
| 聚类 | `POST /api/clustering/kmeans/debug_step` | 执行 K-Means 单步 |
| 聚类 | `POST /api/clustering/dbscan/debug_init` | 初始化 DBSCAN 单步演示 |
| 聚类 | `POST /api/clustering/dbscan/debug_step` | 执行 DBSCAN 单步 |
| 聚类 | `GET /api/clustering/debug_state/<debug_key>` | 查询聚类调试状态 |
| 分类 | `POST /api/svm/train`、`POST /api/svm/predict` | SVM 训练与预测 |
| 分类 | `POST /api/knn/train`、`POST /api/knn/predict` | KNN 训练与预测 |
| 分类 | `POST /api/decision_tree/train`、`POST /api/decision_tree/predict` | 决策树训练与预测 |
| 分类 | `POST /api/decision_tree/decision_path` | 查询样本决策路径 |
| 分类 | `POST /api/bayesian_classification/train` | 高斯朴素贝叶斯训练 |
| 分类 | `POST /api/bayesian_classification/probabilities` | 查询详细后验概率 |
| 回归 | `POST /api/linear_regression/train`、`POST /api/linear_regression/predict` | 回归训练与预测 |
| 回归 | `POST /api/linear_regression/excel/preview` | 预览 Excel 工作表、列与样例数据 |
| 回归 | `POST /api/linear_regression/excel/import` | 从 Excel 选择特征列和目标列并创建数据会话 |
| SGD | `POST /api/sgd/train`、`POST /api/sgd/predict` | SGD 模型训练与预测 |
| SGD | `POST /api/sgd/start_training_session` | 初始化分步训练 |
| SGD | `POST /api/sgd/train_step`、`POST /api/sgd/get_training_state` | 单步训练与状态查询 |
| SGD | `POST /api/sgd/compare_optimizers` | 比较优化器 |
| SGD | `GET /api/sgd/get_available_models`、`GET /api/sgd/get_available_optimizers` | 查询可用模型和优化器 |
| SGD | `POST /api/sgd/reset_training_session` | 重置训练会话 |
| 神经网络 | `POST /api/neural_network/train` | 训练感知机或 MLP |
| 神经网络 | `POST /api/neural_network/decision_boundary` | 生成二维决策边界 |
| 神经网络 | `POST /api/neural_network/train_step` | 分步训练 |
| 集成学习 | `POST /api/ensemble/train` | 训练集成模型 |
| 集成学习 | `POST /api/ensemble/decision_boundaries` | 获取基学习器决策边界 |
| 集成学习 | `GET /api/ensemble/base_learners` | 查询可用基学习器 |
| 降维 | `GET /api/dimensionality_reduction/datasets` | 查询数据集和可用算法 |
| 降维 | `POST /api/dimensionality_reduction/load_data` | 加载内置或合成高维数据 |
| 降维 | `POST /api/dimensionality_reduction/apply` | 执行一种降维算法 |
| 降维 | `POST /api/dimensionality_reduction/compare` | 比较多种降维算法 |
| 降维 | `GET /api/dimensionality_reduction/info/<result_key>` | 查询降维结果详情 |
| 通用 | `GET /api/model_info/<model_key>` | 查询模型摘要 |
| 通用 | `POST /api/clear_session` | 清空当前进程中的全部数据和模型 |

更具体的算法参数及返回字段可查看 `app.py` 中对应路由和 `backend/algorithms/` 中的实现。

## 添加新算法

1. 在 `backend/algorithms/` 新建算法模块，并按任务类型复用 `BaseAlgorithm`、`BaseClassificationAlgorithm` 或 `BaseRegressionAlgorithm`；
2. 在 `app.py` 初始化算法对象并注册 `/api/<algorithm>/<action>` 路由；
3. 在 `frontend/templates/` 创建同名页面，通过 `/static/js/api-client.js` 或 Fetch API 调用后端；
4. 在 `frontend/templates/index.html` 添加导航入口；
5. 使用 Flask 测试客户端或浏览器验证数据生成、训练、预测及异常响应。

分类算法的最小结构示例：

```python
from .base import BaseClassificationAlgorithm


class NewAlgorithm(BaseClassificationAlgorithm):
    def train_model(self, X, y, **params):
        # 构造模型、训练并返回页面所需结果
        ...
```

新增接口时建议保持以下约定：

- 数据生成返回 `session_key`；
- 模型训练接收 `session_key` 并返回 `model_key`；
- 参数统一放在 `params` 字段中，算法选择放在 `algorithm` 字段中；
- 响应包含 `status`，错误响应同时包含可读的 `message`；
- 传给 `jsonify` 的 NumPy 数组和标量应先转换为 Python 列表和数值。

## 开发与验证

仓库包含 Python unittest 测试与可选浏览器验收；修改后先执行 `python -m unittest discover -s tests -v`，并建议执行以下检查：

```bash
# 检查 Python 文件是否存在语法错误
python -m compileall app.py backend

# 启动后验证首页和基础数据接口
curl http://localhost:5432/
curl http://localhost:5432/api/data/get_available_types
```

涉及具体算法时，还应按“生成数据 → 训练模型 → 预测/可视化”的完整链路进行验证。

## 已知限制

- 会话、数据集、模型和训练历史全部保存在单进程内存中，不会持久化；
- 原工作台的访问者共享全局状态，`/api/clear_session` 会清除原工作台状态；新增 ML Arena 使用无状态计算，不共享实验数据；
- 当前实现适合本地教学演示，不适合直接部署为多用户生产服务；
- 原工作台 API 地址使用 `localhost:5432`，通过其他端口或远程主机访问前需要调整配置；新增 ML Arena 使用同源请求；
- Chart.js 与 Plotly 已在项目内本地托管，算法页面无需公共 CDN 即可加载图表；
- 部分二维可视化只适用于恰好包含两个特征的数据；
- `run.sh` 与 `python start.py` 均默认监听 5432 端口；
- `requirements.txt` 使用固定的较旧科学计算栈；如在较新的 Python 版本上安装失败，优先使用 Python 3.8～3.11 的独立虚拟环境。

## 常见问题

### 页面能打开，但训练请求失败

确认服务由 `python start.py` 启动并监听 5432 端口，然后在浏览器开发者工具的 Network/Console 中检查请求地址和后端返回的 `message`。

### 提示“数据未找到，请先生成数据”

训练接口依赖数据生成接口返回的 `session_key`。服务重启、调用 `/api/clear_session` 或传错键值后，需要重新生成数据。

### 提示“模型未找到”

预测和详情接口依赖训练响应中的 `model_key`。模型只保存在当前服务进程内，重启后需要重新训练。

### 安装 `xgboost`、`umap-learn` 或科学计算依赖失败

先升级 pip，并确认正在使用受依赖支持的 Python 版本：

```bash
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r requirements.txt
```

### California Housing 数据无法加载

该数据集可能需要首次在线下载。检查网络连接，或改用项目内无需下载的合成数据和其他 scikit-learn 内置数据集。

## 安全提示

Flask 应用监听 `0.0.0.0`，同一局域网中的设备可能访问该服务。不要在不可信网络中暴露调试模式，也不要直接将当前应用作为公网生产服务运行。

## 许可证

本项目采用 [MIT License](LICENSE) 开源。
