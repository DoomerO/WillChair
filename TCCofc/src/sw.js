if(!self.define){let e,s={};const a=(a,r)=>(a=new URL(a+".js",r).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,o)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const f=e=>a(e,c),n={module:{uri:c},exports:i,require:f};s[c]=Promise.all(r.map((e=>n[e]||f(e)))).then((e=>(o(...e),i)))}}define(["./workbox-7ddbc25a"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"App.tsx",revision:"14bad79d40c2f5600a2f0065b393e94c"},{url:"colors/colors.ts",revision:"1e4d5aa751ac33cb89b96bcd2c8f9f10"},{url:"components/Avaliation.tsx",revision:"984ab50be19714c8bc8169139cb18749"},{url:"components/Category.tsx",revision:"19173bf7528ff76100b8c9731d61e8d6"},{url:"components/chats/ChatBox.tsx",revision:"7fc709cf634503f0346337b2fe89d5d3"},{url:"components/chats/ChatSign.tsx",revision:"5b936b63256a822ccdba227f99f7f0c0"},{url:"components/chats/ChatSignList.tsx",revision:"006ce2dfc493bdb48e64b542986504fe"},{url:"components/chats/ChatSquare.tsx",revision:"a6d76fde420e76959b6fae00112d9782"},{url:"components/code/codes.ts",revision:"3da792cadf4edc812eff3f39e054656a"},{url:"components/code/dataDisplayer.ts",revision:"b4050626e3294a0c96086ca5fd320dd5"},{url:"components/code/decoderToken.ts",revision:"d7f8427a6c9439172fab5adbbd5bb490"},{url:"components/code/interfaces.ts",revision:"a8eb501d74a07f8795b9945a55584286"},{url:"components/code/logout.ts",revision:"b9053ebc65c771a83eae62bf64bf02f3"},{url:"components/code/serverUrl.ts",revision:"bbb0e8de82a043a8fe6a0cc9ec9c9a27"},{url:"components/code/tilt.ts",revision:"9fd3fbffedaa9fe772557ecf9eac6b2c"},{url:"components/comments/Comment.tsx",revision:"f8d145477a46b9f37a328f71b2d5dbd2"},{url:"components/comments/CommentList.tsx",revision:"6576a92c6f002ad0c5654d9672768afa"},{url:"components/Footer.tsx",revision:"61b1beb4de3ca88fce6f7f4adb28af6f"},{url:"components/Header.tsx",revision:"34c66af765bd6f6f5f658aa23d6480c5"},{url:"components/HeaderLogged.tsx",revision:"5c2167d2549a8a3ec6a3df9f2fd8c9c9"},{url:"components/offerCards/AddOfferCard.tsx",revision:"867c58ad9ee4d17cf8deabc69a1973da"},{url:"components/offerCards/OfferCard.tsx",revision:"f06f7ec396ed8cddf6a3bfe3e4905872"},{url:"components/offerCards/OfferCardHorizontal.tsx",revision:"4182e0c99c2e17963216b5b7ccb5cb25"},{url:"components/offerCards/OfferList.tsx",revision:"f24965c3f8651527c7ebb1657301e115"},{url:"components/Password.tsx",revision:"4322153a032315d8cc306931c6a8c8b6"},{url:"components/ProdInfoTable.tsx",revision:"a8cd246683c985ebcc6b19ffaa2b67f4"},{url:"components/ProdInfoTableUpdt.tsx",revision:"fe8793c15ceb53f653c048ea63226f0c"},{url:"components/signs/SignAdaptable.tsx",revision:"054fe8fc0c1c180e336f38623c243bb6"},{url:"components/signs/SignNotFound.tsx",revision:"a9d37efb2b27f82311e16d742e1a81ee"},{url:"components/signs/SignNotFoundButton.tsx",revision:"cb6709793c7c6c47d392ea4e9949dee7"},{url:"components/SlideMsg.tsx",revision:"883b52bfc17c5ab641bc01c84d85f015"},{url:"components/socket/socket.ts",revision:"a63f2db908aafef260bd7763a0b7209d"},{url:"components/TeamModal.tsx",revision:"77bb5aa755fb1a9d81b9a7ea3e60bdd3"},{url:"components/toggles/ComponentLoading.tsx",revision:"428d9116024ae1353d8cba5fcca18600"},{url:"components/toggles/HeaderToggle.tsx",revision:"7149c1c42a751de86f6f668ad0134d03"},{url:"components/toggles/Loading.tsx",revision:"b495ec942991277afc5f45e735852f6c"},{url:"components/toggles/PageToggle.tsx",revision:"2177e28c62eebd892aeef74abd8ea349"},{url:"fonts/AtkinsonHyperlegible.ttf",revision:"28147924c6c58c46f245a75ebf336a53"},{url:"fonts/DoHyeon.ttf",revision:"e936c2ac07d7faf3d4b459633e1e174f"},{url:"fonts/fonts.css",revision:"317139eb2706f16b5d5c3f67ad759b6b"},{url:"fonts/KdamThmor.ttf",revision:"7f30542a7d396654b40db106fcf9acf9"},{url:"fonts/Outfit.ttf",revision:"9f444021dd670d995f9341982c396a1d"},{url:"img/categories/andador claro.png",revision:"3e8adf230a6d17d856caa07becc12d4b"},{url:"img/categories/andador.png",revision:"00fb92bbc36edc5ce01908352a55e093"},{url:"img/categories/bengala claro.png",revision:"da2bebc743c15fea6ef8bcf386827351"},{url:"img/categories/bengala.png",revision:"4832c5e184fee5c363e3a968c4b06495"},{url:"img/categories/cadeira-de-rodas claro.png",revision:"e467d21004e7d1e3ac9325575a4c531e"},{url:"img/categories/cadeira-de-rodas.png",revision:"7ddc245d125cd50c705899fe93f80e30"},{url:"img/categories/diversidade claro.png",revision:"280dff4ed1af0de23ae403747f608b1e"},{url:"img/categories/diversidade.png",revision:"423285f6c9260e915d27729e35e42dbd"},{url:"img/categories/muleta claro.png",revision:"f9b954ff409d2ca319f33df93160b62d"},{url:"img/categories/muleta.png",revision:"bd4e7dfaa0bfba47a69966dfc4ce0d00"},{url:"img/home/homeImgBottom.png",revision:"9611559b7604dfbf71492d560a5a2c17"},{url:"img/home/logo.png",revision:"7382194dd969d2c8ac8294185fcfecae"},{url:"img/home/logoDark.png",revision:"e7def2c09eeb2ad28754770b04c6058b"},{url:"img/home/logoW.png",revision:"994ece5875aaee7ab5457c031adb01e3"},{url:"img/report/reportImg.png",revision:"5a7c2371c8607f4f3192673539b0d8a7"},{url:"main.tsx",revision:"967d6d0282291a99c9b07db0584b9c51"},{url:"pages/About.tsx",revision:"df71eb6fe1948291bbcc9e50d063ba33"},{url:"pages/Contact.tsx",revision:"804eead61af827984d6835cbb85d6e9d"},{url:"pages/createOfferPages/AndadorOffer.tsx",revision:"661baa231fad4511a9b28a684bdcf7e4"},{url:"pages/createOfferPages/BengalaOffer.tsx",revision:"1d3c235b3c40187f950631cb4906e66e"},{url:"pages/createOfferPages/CaderiaRodasOffer.tsx",revision:"6d091d603c47276d4613b46c691e6434"},{url:"pages/createOfferPages/CreateOffer.tsx",revision:"3cd225c337da1b6dee5cc0f454089f6e"},{url:"pages/createOfferPages/MuletaOffer.tsx",revision:"8f292be35a46fe1f80240dadf8eb0fd8"},{url:"pages/createOfferPages/OfferCreationToggle.tsx",revision:"c89e33bce10b2d2bf7d662a29f121b57"},{url:"pages/createOfferPages/OtherOffer.tsx",revision:"a56705cc6486097c360b045226f12f0e"},{url:"pages/CurrentChats.tsx",revision:"9529a99d15e07dcb13601243ca41cab1"},{url:"pages/Home.tsx",revision:"a0b9e6606201f567a34b0a07b8311583"},{url:"pages/HomeProd.tsx",revision:"d0c41e6bafb50740bc86fcd4da1a6125"},{url:"pages/intersections/ConfirmLogOut.tsx",revision:"528cb2df3510657aa2e8f4c8fcc7b035"},{url:"pages/intersections/EmailChange.tsx",revision:"c0555700533f89d4f9cda46ff61b49f3"},{url:"pages/intersections/EmailConfirmation.tsx",revision:"af0e5217d3a734d04e64571c588e456e"},{url:"pages/intersections/NotLogged.tsx",revision:"9a71aaccab2675eb1d070950d9338fc9"},{url:"pages/intersections/PasswordChange.tsx",revision:"5f703f278bf9caf96602ebbb49768846"},{url:"pages/intersections/Policy.tsx",revision:"b1767c21971bbe6e8af9a23c8c0999c0"},{url:"pages/intersections/PreConfig.tsx",revision:"085a479b4a3e86e3457dab34956aae63"},{url:"pages/intersections/Terms.tsx",revision:"aa1cf12b05427afb8e7e7c10cbb79d69"},{url:"pages/intersections/TokenErrorPage.tsx",revision:"5e1dbd34a05a73f8a787aa9754f194e9"},{url:"pages/Login.tsx",revision:"fad94265985f83719af833764652314e"},{url:"pages/offerPages/OfferPage.tsx",revision:"fe0713c7b953f190ddf686087d5c10b6"},{url:"pages/offerPages/OfferPageChat.tsx",revision:"12d358ede64627c3e63c717a041238e1"},{url:"pages/offerPages/OfferPageLogged.tsx",revision:"40e71ca2fc51bcc0b20efd0242493a93"},{url:"pages/offerPages/OfferPageOwner.tsx",revision:"56e2fc41ac292524b3cec2bf02eb2c49"},{url:"pages/profilePages/Profile.tsx",revision:"36d8569d961a30b85ecb321a9e4b2f64"},{url:"pages/profilePages/ProfileOwn.tsx",revision:"0eb9fbe548398c13cb74ae7ee4a08bfc"},{url:"pages/profilePages/ProfileToggle.tsx",revision:"8234691ae28ee0ae1e58dc86abbe2d19"},{url:"pages/Report.tsx",revision:"0e879430ace54fd31ffd04ff4b3bd63c"},{url:"pages/Search.tsx",revision:"5736e8e4929545fce276de81aa5d810c"},{url:"Router.tsx",revision:"0a928f5a75943a33462866c7a0c80589"},{url:"styles/alice-carousel.css",revision:"721242602faedfd0ca18e6d466b41262"},{url:"styles/App.css",revision:"04a93ba96e0ecc92f9373a959a62e8db"},{url:"styles/scrollbar.css",revision:"ec6a2d66161e38dc8cc2ae2ebbeabe04"},{url:"vite-env.d.ts",revision:"8f68c27c3fc38817b2726b20e2d4f1ee"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
