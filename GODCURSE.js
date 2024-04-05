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
var bcModSDK=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();
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

    //permacd - Make combination lock cannot be unlocked (undefined).
    ,CommandCombine([{
        Tag: 'permahorny',
        Description: ": Make combination lock cannot be unlocked (undefined).",
        Action: (args) => {
            
            function generateRandomString(length) {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
                let randomString = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomString += characters[randomIndex];
                }
                return randomString;
            }


            var strLock1 = args;
            var targetname = strLock1;
            var targetfinder = new RegExp('^'+targetname+'', 'i');
            var target = ChatRoomCharacter.filter(A => (A.Name.match(targetfinder)));
            var passCure = generateRandomString(128)
            
            target[0].LSCG.InjectorModule.hornyCooldown = 1e+100;
            target[0].LSCG.InjectorModule.hornyLevelMax = 5;
            target[0].LSCG.InjectorModule.hornyLevel= 500;
            target[0].LSCG.InjectorModule.cureKeyword = null;
            target[0].LSCG.InjectorModule.cureKeywords = passCure;
            //(4) ['antidote', 'healing', 'curing', 'cure']

            ChatRoomCharacterUpdate(target[0]);
            ChatRoomSendLocal("<p style='background-color:#9a0e2a'>Permanently Horny, Cure: </p>" + passCure);
            ChatRoomCharacterUpdate(target[0]);
        }
    }]);
    
// Delay between each command execution (in milliseconds)
const delayBetweenCommands = 1500; // 1.5 second delay

// Execute commands with delay
executeCommands(commandsWithDelay, delayBetweenCommands);
