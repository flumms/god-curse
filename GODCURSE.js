// ==UserScript==
// @name GodCurse
// @namespace https://www.bondageprojects.com/
// @version 1.0
// @description Just 4 Fun
// @author Lara
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @grant none
// @run-at document-end
// ==/UserScript==

//SDK stuff
var bcModSDK=function(){"use strict";const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return!!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e))}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name)}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d}}return{hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else{let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e}return((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0)}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l()}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l())}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l()},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l()},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o}return window.bcModSdk}();return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
//SDKstuff end

function executeCommands(commands, delay) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < commands.length) {
            commands[index].Action(commands[index].Args);
            index++;
        } else {
            clearInterval(interval); // Stop execution when all commands are executed
        }
    }, delay);
}

const commandsWithDelay = [
    CommandCombine([{
        Tag: 'ghelp',
        Description: ": Show God-Curse command list",
        Action: (args) => {

            if (args === "") {
                ChatRoomSendLocal(
                    "<p style='background-color:#5fbd7a'><b>God-Curse</b>\n" +
                    "<b>/block</b> = block your item slot (Enable script on setting.)\n" +
                    "<b>/unblock</b> = unblock your item slot (Enable script in setting)\n" +
                    "<b>/owned</b> = Lock yourself in owner padlock with owner member number.\n" +
                    "<b>/tighten</b> = tighten your own binding as much as you want (Maximum is 1+e20)\n" +
                    "<b>/olocks</b> (number) = lock yourself in owner lock with custom member number.\n" +
                    "<b>/randpw</b> (target) = lock the target with password lock. Each lock has it's own password random and different\n" +
                    "<b>/randcd</b> (target) = lock the target with combination lock. Each lock has it's own password random and different.\n"+
                    "<b>/permacd</b> (target) = lock the target with combination lock. Make combination lock cannot be unlocked (undefined).\n"
                )
            };
        }
    }])

    //block - Block your item inventory, preventing someone tampering with items.
    ,CommandCombine([{
        Tag: 'block',
        Description: ": Block all your items",
        Action: () => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            ChatRoomSendLocal(
                "<p style='background-color:#9a0e2a'>Permanently Locked</p>"
            );
            InventoryWear(Player, "Script", "ItemScript");
            InventoryGet(Player, "ItemScript").Property = {
                Block: [
                    "ItemAddon",
                    "ItemArms",
                    "ItemBoots",
                    "ItemBreast",
                    "ItemDevices",
                    "ItemEars",
                    "ItemFeet",
                    "ItemHandheld",
                    "ItemHands",
                    "ItemHead",
                    "ItemHood",
                    "ItemLegs",
                    "ItemMisc",
                    "ItemMouth",
                    "ItemMouth2",
                    "ItemMouth3",
                    "ItemNeck",
                    "ItemNeckAccessories",
                    "ItemNeckRestraints",
                    "ItemNipples",
                    "ItemNipplesPiercings",
                    "ItemNose",
                    "ItemPelvis",
                    "ItemTorso",
                    "ItemTorso2",
                    "ItemVulva",
                    "ItemVulvaPiercings",
                    "Jewelry",
                    "LeftAnklet",
                    "LeftHand",
                    "Mask",
                    "Mouth",
                    "Nipples",
                    "Panties",
                    "Pussy",
                ]
            }
            CurrentScreen === 'ChatRoom' ?
                ChatRoomCharacterUpdate(Player) :
                CharacterRefresh(Player);
        }
    }])

    //unblock -- Unblock your item inventory, allowing someone tampering with items.
    ,CommandCombine([{
        Tag: 'unblock',
        Description: ": Unblock all your items",
        Action: () => {
            if (Player.Nickname == '') {
                var tmpname = Player.Name;
            } else {
                var tmpname = Player.Nickname;
            }
            ChatRoomSendLocal(
                "<p style='background-color:#5fbd7a'>Unlocked!</p>"
            );
            InventoryWear(Player, "Script", "ItemScript");
            InventoryGet(Player, "ItemScript").Property = {
                Unblock: [
                    "ItemAddon",
                    "ItemArms",
                    "ItemBoots",
                    "ItemBreast",
                    "ItemDevices",
                    "ItemEars",
                    "ItemFeet",
                    "ItemHandheld",
                    "ItemHands",
                    "ItemHead",
                    "ItemHood",
                    "ItemLegs",
                    "ItemMisc",
                    "ItemMouth",
                    "ItemMouth2",
                    "ItemMouth3",
                    "ItemNeck",
                    "ItemNeckAccessories",
                    "ItemNeckRestraints",
                    "ItemNipples",
                    "ItemNipplesPiercings",
                    "ItemNose",
                    "ItemPelvis",
                    "ItemTorso",
                    "ItemTorso2",
                    "ItemVulva",
                    "ItemVulvaPiercings",
                    "Jewelry",
                    "LeftAnklet",
                    "LeftHand",
                    "Mask",
                    "Mouth",
                    "Nipples",
                    "Panties",
                    "Pussy",
                ]
            }
            CurrentScreen === 'ChatRoom' ?
                ChatRoomCharacterUpdate(Player) :
                CharacterRefresh(Player);
        }
    }])

    //owned - Lock yourself in owner padlock with owner member number.
    ,CommandCombine([{
        Tag: 'owned',
        Description: ": Lock yourself in Owner Padlock with Owner Member Number",
        Action: () => {
            var ownerMN = Player.Ownership.MemberNumber;
            var ownership = Player.Ownership;
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    InventoryLock(Player, Player.Appearance[A], "OwnerPadlock", ownerMN)
                }
            ChatRoomSendLocal("<p style='background-color:#5fbd7a'>Pemanently Locked by Owner!</p>");
            ChatRoomCharacterUpdate(Player)
            CharacterRefresh(Player);
        }
    }])

    //tighten - Tighten the binding as much as you want.
    ,CommandCombine([{
        Tag: 'tighten',
        Description: ": Tighten your binding as much as you want. (Limit: 1e20)",
        Action: (args) => {
            var stringSol1 = args;
            var solidity = stringSol1;
            ChatRoomSendLocal("<p style='background-color:#9a0e2a'>Your binding has been tighten!</p>");
            for (let A = 0; A < Player.Appearance.length; A++)
                if (Player.Appearance[A].Asset.Group.Name != null) {
                    if (Player.Appearance[A].Asset.Group.Name.startsWith("Item")) {
                        Player.Appearance[A].Difficulty = solidity;
                    }
                };
            CurrentScreen === 'ChatRoom' ?
                ChatRoomCharacterUpdate(Player) :
                CharacterRefresh(Player);
        }
    }])

    //olocks - Owner lock with custom member number. (BROKEN -- WIP)
    ,CommandCombine([{
        Tag: 'olocks',
        Description: ": Owner lock with custom member number.",
        Action: (args) => {
            var stringLock1 = args;
            var memNumber = parseInt(stringLock1);
            var ownerMN = Player.Ownership.MemberNumber

            for (let A = 0; A < Player.Appearance.length; A++) {
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    InventoryLock(Player, Player.Appearance[A], "OwnerPadlock", ownerMN)
                }
            };
            for (let A = 0; A < Player.Appearance.length; A++) {
                if (Player.Appearance[A].Asset.AllowLock == true) {
                    Player.Appearance[A].Property.LockMemberNumber = memNumber
                }
            };

            ChatRoomSendLocal("<p style='background-color:#5fbd7a'>Pemanently Locked by Owner!</p>");
            ChatRoomCharacterUpdate(Player)
        }
    }])

    //randpw - Randomize password lock, different password each locks.
    ,CommandCombine([{
        Tag: 'randpw',
        Description: ": Randomize password lock, different password each locks.",
        Action: (args) => {

            function generateRandomString(length) {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let shuffledAlphabet = alphabet.split('').sort(() => Math.random() - 0.5).join('');
                return shuffledAlphabet.substring(0, length);
            }

            var strLock1 = args;
            var targetname = strLock1;
            var targetfinder = new RegExp('^' + targetname + '', 'i');
            var target = ChatRoomCharacter.filter(A => (A.Name.match(targetfinder)));

            for (let A = 0; A < target[0].Appearance.length; A++) {
                if (target[0].Appearance[A].Asset.AllowLock == true) {
                    InventoryLock(target[0], target[0].Appearance[A], "PasswordPadlock");
                    if (target[0].Appearance[A].Property.LockedBy == "PasswordPadlock") {
                        const pw = generateRandomString(8); // Generate random password
                        target[0].Appearance[A].Property.Password = "PASSWORD";
                        target[0].Appearance[A].Property.Password = pw;
                        target[0].Appearance[A].Property.Hint = "There are 62990928000 permutations of the password. Goodluck!"
                        target[0].Appearance[A].Property.LockSet = true
                    }
                }
            }
            ChatRoomSendLocal("<p style='background-color:#9a0e2a'>Randomly Locked with Password Padlock. "+target[0]+" are fucked and good luck!</p>")
            ChatRoomCharacterUpdate(target[0]);
        }
    }])

    //randcd - Randomize combination lock, different password each locks.
    ,CommandCombine([{
        Tag: 'randcd',
        Description: ": Randomize combination lock, different password each locks.",
        Action: (args) => {
        
            var strLock1 = args;
            var targetname = strLock1;
            var targetfinder = new RegExp('^'+targetname+'', 'i');
            var target = ChatRoomCharacter.filter(A => (A.Name.match(targetfinder)));
            
            for (let A = 0; A < target[0].Appearance.length; A++) {

                if (target[0].Appearance[A].Asset.AllowLock == true) {
                    InventoryLock(target[0], target[0].Appearance[A], "CombinationPadlock")
                    var code = String(Math.floor(Math.random() * 9000) + 1000);
                    target[0].Appearance[A].Property.CombinationNumber = code
                }
            };
            ChatRoomSendLocal("<p style='background-color:#9a0e2a'>Every binding has been locked with random key!. You're fucked!. </p>");
            ChatRoomCharacterUpdate(target[0]);
        }
    }])

    //permacd - Make combination lock cannot be unlocked (undefined).
    ,CommandCombine([{
        Tag: 'permacd',
        Description: ": Make combination lock cannot be unlocked (undefined).",
        Action: (args) => {
        
            var strLock1 = args;
            var targetname = strLock1;
            var targetfinder = new RegExp('^'+targetname+'', 'i');
            var target = ChatRoomCharacter.filter(A => (A.Name.match(targetfinder)));
            
            for (let A = 0; A < target[0].Appearance.length; A++) {

                if (target[0].Appearance[A].Asset.AllowLock == true) {
                    InventoryLock(target[0], target[0].Appearance[A], "CombinationPadlock")
                    var code = Math.floor(Math.random() * 9000) + 1000;
                    target[0].Appearance[A].Property.CombinationNumber = code
                }
            };
            ChatRoomSendLocal("<p style='background-color:#9a0e2a'>Every binding has been locked permanently!. You're fucked!. </p>");
            ChatRoomCharacterUpdate(target[0]);
        }
    }])];
    
// Delay between each command execution (in milliseconds)
const delayBetweenCommands = 1500; // 1.5 second delay

// Execute commands with delay
executeCommands(commandsWithDelay, delayBetweenCommands);
