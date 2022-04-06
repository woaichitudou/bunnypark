# 区块链项目，钱包连接以及简单合约调用演示项目
s

本项目基于 [react-typescript-sass-standard-template](https://github.com/fengcms/react-typescript-sass-standard-template) 构建。其目录规划、自动注册组件、多语言、SCSS、以及风格约束，请查看该项目说明文档。

本文档仅对区块链内容进行补充说明。

> PS: 请注意，在撰写这篇文章时，我只研究了区块链项目前端对接2天而已，所以，不可避免的，会出现很多理解偏差。本文的作用是尽快让你可以开始工作，而不是吃透区块链。我没有这个本事。
> 关于 React 的基础知识，不在本文讨论范围内。阅读本文，我默认你已经掌握了 React 的中级以上的开发能力。

## 概念

区块链项目与传统中心化项目最大的不同，是其全程围绕的是区块链钱包进行操作。我们可以把区块链钱包，理解成我们中心化项目中的API服务器。

### 链

这里的“链”是指，我们的项目，依赖于哪个区块链进行工作。目前主流有以太坊、币安智能链等等。本演示项目是以币安智能链的测试链为基础的。

不同的链有不同的特性，进行链上操作时，消耗的区块链币也是不一样的。比如币安智能链消耗的就是BNB。

### 链 RCP

是指区块链服务的节点服务器地址。以币安智能链的正式链为例，有以下几个节点：

```
https://bsc-dataseed1.ninicoin.io
https://bsc-dataseed1.defibit.io
https://bsc-dataseed.binance.org
https://bsc-dataseed1.binance.org
```

如何配置区块链钱包，可以使用这些节点，可以参考币安的官方文档 https://academy.binance.com/zh/articles/connecting-metamask-to-binance-smart-chain

### 链 ID

在已经确定使用那条链的前提下，链ID是用来指定是使用正式链，还是测试链。以币安智能链为例，56 是指正式链，97 是指测试链。

在使用测试链的时候，需要用到一些测试BNB，可以在 https://testnet.binance.org/faucet-smart 这个地址进行领取。24小时可以领取1BNB，对于我们的测试来说，足够了。

### 区块链钱包

你可以利用区块链钱包，生成一个属于你自己的钱包地址（也可以通过其他方式），在区块链钱包中，你可以查看你的余额，和历史操作。以 Chrome 浏览器为例，metamask（狐狸头）是非常好用的一款区块链钱包。

metamask 官方网站网址： https://metamask.zendesk.com/hc/en-us

chrome 插件网址：https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn

除了 metamask，还有很多其他的钱包也可以使用。你的区块链钱包地址，在各个不同的区块链钱包中，都是通用的。可以通过助记词或者私钥进行导入。

手机端的钱包，我推荐的是 tokenpocket， 其官方网站是 https://www.tokenpocket.pro/ 。这个网站有大量中文的区块链技术帮助文档，值得阅读。

### 链上地址

任何一个合约，都会最终生成一个哈希值，也就是我们的链上地址。形如 `0x147d09D7B5b99cE3549bF115028033101d8e9FBe`

在本演示项目中，地址配置在 `src/config/constants/contract.ts` 文件。

### ABI 文件

光有一个地址，我们前端代码是无法进行链上操作的，我们还需要一个合约对应的 ABI 文件。这是一个 json 文件，在这个文件中，会描述该合约支持的各种操作。

具体内容，我们不必深究。区块链后端，在给我们一个合约地址的同时，必须也给我们一个 ABI 文件。

在本演示项目中，ABI 文件的存放位置为 `src/config/abi`。

## 业务开发流程

### 组织页面

我们在 `src/views` 目录中，进行路由以及页面的组织。原则上，这里不应该有任何具体的业务代码（实际上可以有）。

我们应该尽量将业务，封装到各个组件中去，以保持我们的页面文件的简单清爽。

### 组织组件

确定了页面以后，我们可以在 `src/components` 文件中，根据我们的 views 结构，进行对应的组件规划。

本演示项目，采用了组件自动注册，无论你的组件在目录中的层级如何，都可以方便的调用。详情请参考本文开头给出的网址中的说明，或参考项目中的代码。

业务，尽量封装在组件中。在页面级别上，仅做一些居中调度的工作。

### *连接钱包

在本演示项目中，已经完成了所有连接钱包的工作，但是没有任何的美化。所有代码在 `src/components/common/Wallet` 目录中，可根据自己的需求，重写样式，或重新组织 DOM 结构。

所有业务均已完成，无需更多处理。

### 配置地址以及ABI

在 `src/config/constants/contract.ts` 文件中，配置对应的地址。

在 `src/utils/addressHelpers.ts` 文件中，定义一个新的方法，导出我们的地址。

在 `src/config/abi` 目录中，添加我们的 ABI 文件。

在 `src/utils/contractHelpers.ts` 文件中，创建我们的连接函数。

参考项目的演示代码，so TM easy。

### 创建区块链请求数据类

在 `src/stores` 文件中，创建对应的类文件。在这个文件中，返回数据，和合约支持的各种方法。

在本项目中，我进行了数据的存取、链上合约的查询、操作等演示。可以查看 `src/stores/testStore.ts`

### 在组件中调用

可以参考 `src/components/web/Home/testName.tsx` 演示文件，文件中，注释还是比较完整的。

### 总结

1. 先规划页面和组件。
2. 弄好 ABI 和 地址配置。
3. 写好数据类。
4. 调用。
