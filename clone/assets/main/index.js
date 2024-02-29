window.__require = function t(e, i, n) {
    function s(a, c) {
        if (!i[a]) {
            if (!e[a]) {
                var r = a.split("/");
                if (r = r[r.length - 1],
                !e[r]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l)
                        return l(r, !0);
                    if (o)
                        return o(r, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                a = r
            }
            var u = i[a] = {
                exports: {}
            };
            e[a][0].call(u.exports, function(t) {
                return s(e[a][1][t] || t)
            }, u, u.exports, t, e, i, n)
        }
        return i[a].exports
    }
    for (var o = "function" == typeof __require && __require, a = 0; a < n.length; a++)
        s(n[a]);
    return s
}({
    AndroidUpdateBase: [function(t, e) {
        "use strict";
        cc._RF.push(e, "9d047RtJHRL7pj9PWgg262Y", "AndroidUpdateBase");
        var i = cc.Class({
            extends: yc.YcObject,
            ctor: function() {
                this._storagePath = jsb.fileUtils.getWritablePath()
            },
            showUpdatePanel: function(t) {
                yc.showUpdatePanel(t)
            },
            hideUpdatePanel: function() {
                yc.hideUpdatePanel()
            },
            updateProgress: function(t) {
                yc.setUpdateProgress(t)
            },
            downApk: function(t) {
                this._baseUpdatedCallback = t,
                this.showUpdatePanel("\u4e0b\u8f7d install.apk");
                var e = (new Date).getTime()
                  , i = yc.baseConfig.androidDownloadUrl + "install.apk?time=" + e
                  , n = this._storagePath + "install.apk"
                  , s = this;
                this._download = new yc.AppDownloader;
                var o = function() {
                    this.hideUpdatePanel(),
                    s._baseUpdatedCallback(!0, n)
                }
                .bind(this)
                  , a = function(t) {
                    this.updateProgress(t)
                }
                .bind(this)
                  , c = function(t) {
                    yc.printObject(t, "ClientUpdate onError task_:"),
                    this.hideUpdatePanel(),
                    this._baseUpdatedCallback(!1)
                }
                .bind(this)
                  , r = []
                  , l = {};
                l._url = i,
                l._desPath = n,
                r.push(l),
                this._download.downloadList(r, o, a, c),
                yc.log("destStoragePath:" + n)
            },
            clearBundleDir: function() {
                jsb.fileUtils.removeDirectory(yc.baseConfig.bundlePath)
            },
            tick: function() {}
        });
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    AppBaseImpl: [function(t, e) {
        "use strict";
        cc._RF.push(e, "ee3c232zPBJeY+x3uYEtHE7", "AppBaseImpl"),
        t("AppVersionChecker");
        var i = cc.Class({
            ctor: function() {
                yc.baseConfig.bundlePath = jsb.fileUtils.getWritablePath() + "remote/"
            },
            init: function() {
                jsb.fileUtils.addSearchPath("assets/")
            },
            tick: function() {},
            versionCheck: function(t) {
                this._versionChecker = new yc.AppVersionChecker,
                this._versionChecker.checkVersion(t)
            }
        });
        yc.AppBaseImpl = e.exports = i,
        cc._RF.pop()
    }
    , {
        AppVersionChecker: "AppVersionChecker"
    }],
    AppDownloader: [function(t, e) {
        "use strict";
        cc._RF.push(e, "74966fbhCNGPYpRXa76DyTI", "AppDownloader");
        var i = cc.Class({
            ctor: function() {
                this._storagePath = jsb.fileUtils.getWritablePath(),
                this._downLoadTaskList = []
            },
            download: function(t, e, i, n, s) {
                var o = yc.baseFunction.getPath(e);
                0 == jsb.fileUtils.isDirectoryExist(o) && jsb.fileUtils.createDirectory(o),
                jsb.fileUtils.isDirectoryExist(o);
                var a = {};
                this._downloader.setOnFileTaskSuccess(function(t) {
                    for (var e = 0; e < this._downLoadTaskList.length; ++e)
                        if (a == this._downLoadTaskList[e]) {
                            this._downLoadTaskList.splice(e, 1);
                            break
                        }
                    null != a && a._onSucceed(t, a)
                }
                .bind(this)),
                this._downloader.setOnTaskProgress(function(t, e, i, n) {
                    null != a && a._onProgress(t, e, i, n, a)
                }
                .bind(this)),
                this._downloader.setOnTaskError(function(t) {
                    null != a && a._onError(t, a)
                }
                .bind(this)),
                a._url = t,
                a._desPath = e,
                a._onSucceed = i,
                a._onProgress = n,
                a._onError = s,
                a._status = "downloading",
                a._downTask = this._downloader.createDownloadFileTask(a._url, a._desPath),
                this._downLoadTaskList.push(a)
            },
            cancelDownload: function(t) {
                for (var e = 0; e < this._downLoadTaskList.length; ++e)
                    if (t == this._downLoadTaskList[e]._downTask) {
                        this._downLoadTaskList.splice(e, 1);
                        break
                    }
            },
            downloadList: function(t, e, i, n) {
                if (null != t && 0 != Array.isArray(t) && !(t.length <= 0)) {
                    var s = {};
                    s._totalFileCount = t.length,
                    s._finishedCount = 0,
                    s._fileList = [],
                    s._downloader = new jsb.Downloader;
                    for (var o = 0; o < t.length; ++o) {
                        var a = {};
                        a._url = t[o]._url,
                        a._desPath = t[o]._desPath,
                        a._status = "",
                        s._fileList.push(a)
                    }
                    s._onSucceed = e,
                    s._onProgress = i,
                    s._onError = n;
                    var c = 0
                      , r = 0;
                    s._downloader.setOnFileTaskSuccess(function() {
                        if (s._finishedCount++,
                        s._finishedCount != s._totalFileCount)
                            s._downloader.createDownloadFileTask(s._fileList[s._finishedCount]._url, s._fileList[s._finishedCount]._desPath);
                        else {
                            for (var t = 0; t < this._downLoadTaskList.length; ++t)
                                if (this._downLoadTaskList[t] == s) {
                                    this._downLoadTaskList.splice(t, 1);
                                    break
                                }
                            s._onSucceed(s)
                        }
                    }
                    .bind(this)),
                    s._downloader.setOnTaskProgress(function(t, e, i, n) {
                        if (null != s) {
                            var o = s._finishedCount / s._totalFileCount;
                            -1 == n && ((i = ++c) > (n = 1e3) && (i = n),
                            r != s._finishedCount && (c = 0,
                            r = s._finishedCount));
                            var a = i / n * (1 / s._totalFileCount) + o
                              , l = s._fileList[s._finishedCount]._url;
                            s._onProgress(a, s, l)
                        }
                    }
                    .bind(this)),
                    s._downloader.setOnTaskError(function() {
                        if (null != s) {
                            for (var t = 0; t < this._downLoadTaskList.length; ++t)
                                if (this._downLoadTaskList[t] == s) {
                                    this._downLoadTaskList.splice(t, 1);
                                    break
                                }
                            s._onError(s)
                        }
                    }
                    .bind(this));
                    var l = s._fileList[s._finishedCount]._desPath
                      , u = s._fileList[s._finishedCount]._url
                      , h = yc.baseFunction.getPath(l);
                    0 == jsb.fileUtils.isDirectoryExist(h) && jsb.fileUtils.createDirectory(h),
                    jsb.fileUtils.isDirectoryExist(h),
                    this._downLoadTaskList.push(s),
                    s._downloader.createDownloadFileTask(u, l)
                }
            }
        });
        yc.AppDownloader = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    AppUpdateTool: [function(t, e) {
        "use strict";
        cc._RF.push(e, "28b6dZmZshA86CQ+05ibGdv", "AppUpdateTool");
        var i = cc.Class({
            extends: yc.YcObject,
            ctor: function() {},
            updateZip: function(t, e, i, n, s) {
                this._baseUpdatedCallback = n;
                var o = this;
                this._download = new yc.AppDownloader;
                var a = function() {
                    var t = function() {
                        yc.unregisterTick(this._zip),
                        null != o._baseUpdatedCallback && o._baseUpdatedCallback(!0)
                    }
                    .bind(this);
                    o._zip = new yc.AppZip,
                    yc.registerTick(o._zip),
                    this._zip.unzip(e, i, t)
                }
                .bind(this)
                  , c = function(t) {
                    null != s && s(t)
                }
                .bind(this)
                  , r = function(t) {
                    yc.printObject(t, "ClientUpdate onError task_:"),
                    null != this._baseUpdatedCallback && this._baseUpdatedCallback(!1)
                }
                .bind(this)
                  , l = t
                  , u = e
                  , h = []
                  , d = {};
                d._url = l,
                d._desPath = u,
                h.push(d),
                this._download.downloadList(h, a, c, r)
            },
            tick: function() {
                yc.log("enter update Platform tick")
            },
            updateFolder: function(t, e, i, n, s, o) {
                this._updateClientCallback = s;
                var a = i;
                this._localMd5List = null,
                this._remoteMd5List = null,
                this._checkComparefunc = function() {
                    if (null != this._localMd5List && null != this._remoteMd5List) {
                        for (var i = [], n = 0; n < this._localMd5List.listdata.length; ++n) {
                            for (var s = !0, c = this._localMd5List.listdata[n].path + this._localMd5List.listdata[n].name, r = 0; r < this._remoteMd5List.listdata.length; ++r)
                                if (c == this._remoteMd5List.listdata[r].path + this._remoteMd5List.listdata[r].name) {
                                    s = !1;
                                    break
                                }
                            s && i.push(c)
                        }
                        for (var l = [], u = 0; u < this._remoteMd5List.listdata.length; ++u) {
                            for (var h = !0, d = this._remoteMd5List.listdata[u].path + this._remoteMd5List.listdata[u].name, f = this._remoteMd5List.listdata[u].md5, p = 0; p < this._localMd5List.listdata.length; ++p)
                                if (d == this._localMd5List.listdata[p].path + this._localMd5List.listdata[p].name) {
                                    f == this._localMd5List.listdata[p].md5 && (h = !1);
                                    break
                                }
                            if (h) {
                                var _ = {};
                                _._url = t + d,
                                _._desPath = e + d,
                                l.push(_)
                            }
                        }
                        for (var g = function(t) {
                            if (t) {
                                var e = JSON.stringify(this._remoteMd5List);
                                jsb.fileUtils.writeStringToFile(e, a),
                                this._updateClientCallback(!0)
                            } else
                                this._updateClientCallback(!1)
                        }
                        .bind(this), m = 0; m < i.length; ++m)
                            jsb.fileUtils.removeFile(i[m]);
                        l.length > 0 ? this.downloadFiles(l, g, o) : g(!0)
                    }
                }
                .bind(this),
                yc.Resource.load(a, function(t, e) {
                    null == t ? (this._localMd5List = e.json,
                    this._checkComparefunc()) : this._updateClientCallback(!1)
                }
                .bind(this));
                var c = n;
                yc.Resource.load(c, function(t, e) {
                    null == t ? (this._remoteMd5List = e.json,
                    this._checkComparefunc()) : this._updateClientCallback(!1)
                }
                .bind(this))
            },
            downloadFiles: function(t, e, i) {
                this._download = new yc.AppDownloader;
                var n = function() {
                    e(!0)
                }
                .bind(this)
                  , s = function(t) {
                    i && i(t)
                }
                .bind(this)
                  , o = function(t) {
                    yc.printObject(t, "AppUpdateTool onError task_:"),
                    e(!1)
                }
                .bind(this);
                this._download.downloadList(t, n, s, o)
            }
        });
        yc.AppUpdateTool = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    AppVersionChecker: [function(t, e) {
        "use strict";
        cc._RF.push(e, "247071W2WRKwJVcWijKudf3", "AppVersionChecker");
        var i = cc.Class({
            ctor: function() {},
            tick: function() {},
            checkVersion: function(t) {
                if (this._checkVersionCallback = t,
                0 != this.checkBaseVersion()) {
                    var e = function() {
                        this._checkVersionCallback()
                    }
                    .bind(this)
                      , i = this;
                    this.checkZipinPackage().then(function() {
                        i.selectArea(e)
                    })
                } else
                    yc.showMessageBox("\u7248\u672c\u5df2\u66f4\u65b0\u662f\u5426\u8fdb\u884c\u5b89\u88c5\uff1f", "\u5b89\u88c5", function() {
                        "ios" == yc.baseFunction.getPlatName() ? this.iosUpdateBase() : "android" == yc.baseFunction.getPlatName() ? this.androidUpdateBase() : yc.error("unknow platform")
                    }
                    .bind(this), function() {
                        cc.game.end()
                    }
                    .bind(this), 1)
            },
            selectArea: function(t) {
                var e = function(e) {
                    cc.sys.localStorage.setItem("YC_LOCATION_INDEX", e),
                    yc.baseConfig.selectArea = e;
                    var i = yc.baseFunction.getAreaData(yc.baseConfig.selectArea, yc.baseInfo);
                    if (null == i)
                        return yc.showMessageBox("\u83b7\u53d6\u5f53\u524d\u533a\u57df\u4fe1\u606f\u5931\u8d25:" + yc.baseConfig.selectArea, "\u9519\u8bef", function() {
                            cc.game.end()
                        }, null, 2),
                        void cc.sys.localStorage.removeItem(yc.baseConfig.selectArea);
                    yc.baseInfo.resversion = i.area_client_version,
                    yc.baseConfig.clientDownloadUrl = i.area_res_download_url,
                    this.checkClientVersion(t)
                }
                .bind(this)
                  , i = cc.sys.localStorage.getItem("YC_LOCATION_INDEX");
                null != i ? e(i) : yc.showSelectAreaPanel(e)
            },
            checkZipinPackage: function() {
                var t = this;
                return new Promise(function(e) {
                    null == yc.Version.getClientVersion() ? null == yc.localConfig.inpackages || yc.localConfig.inpackages.length <= 0 ? e() : t.unzipBundleList(e, yc.localConfig.inpackages) : e()
                }
                )
            },
            unzipBundleList: function(t, e) {
                var i = this;
                if (e.length <= 0)
                    t();
                else {
                    var n = e[0].bundleName
                      , s = e[0].version
                      , o = e[0].kindID
                      , a = jsb.fileUtils.fullPathForFilename(n + ".zip");
                    e.splice(0, 1),
                    this.unzipBundle(a, yc.baseConfig.bundlePath).then(function() {
                        null == o ? yc.Version.setClientVersion(s) : yc.Version.setGameVersion(o, s),
                        i.unzipBundleList(t, e)
                    })
                }
            },
            unzipBundle: function(t, e) {
                yc.printObject(this, "print this:");
                var i = this;
                return new Promise(function(n) {
                    i._zip = new yc.AppZip,
                    yc.registerTick(i._zip),
                    i._zip.unzip(t, e, function() {
                        yc.unregisterTick(i._zip),
                        n()
                    })
                }
                )
            },
            checkBaseVersion: function() {
                return yc.baseInfo.clientversion == yc.baseConfig.baseVersion
            },
            checkClientVersion: function(t) {
                var e = yc.Version.getClientVersion();
                if (yc.baseInfo.resversion != e) {
                    this._clientUpdatedCallback = t;
                    var i = function(t) {
                        1 == t ? (yc.Version.setClientVersion(yc.baseInfo.resversion),
                        this._clientUpdatedCallback()) : yc.showMessageBox("\u4e0b\u8f7d\u5927\u5385\u8d44\u6e90\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u6253\u5f00\u8fdb\u884c\u5c1d\u8bd5", "\u9519\u8bef", function() {
                            cc.game.end()
                        }, null, 2)
                    }
                    .bind(this);
                    this._clientUpdate = new yc.ClientUpdate,
                    null != e ? this._clientUpdate.updateClient(i) : this._clientUpdate.downClient(i)
                } else
                    t()
            },
            iosUpdateBase: function() {
                yc.platform.installBase(yc.baseInfo.iosDownloadUrl)
            },
            androidUpdateBase: function() {
                var e = t("AndroidUpdateBase");
                yc.androidUpdateBase = new e,
                yc.androidUpdateBase.clearBundleDir(),
                yc.androidUpdateBase.downApk(function(t, e) {
                    1 == t && yc.platform.installBase(e)
                })
            }
        });
        yc.AppVersionChecker = e.exports = i,
        cc._RF.pop()
    }
    , {
        AndroidUpdateBase: "AndroidUpdateBase"
    }],
    AppZip: [function(t, e) {
        "use strict";
        cc._RF.push(e, "87c69LG+m9HUpoJl+sh8nIu", "AppZip");
        var i = cc.Class({
            extends: yc.YcObject,
            ctor: function() {
                this._zipTaskList = []
            },
            unzip: function(t, e, i) {
                if (null != t) {
                    var n = {};
                    n._fileName = t,
                    n._targetPath = e,
                    n._callback = i,
                    n._status = "doing",
                    this._zipTaskList.push(n),
                    null != jsb.UnZipMgr && (this._kUnzipMgr = jsb.UnZipMgr.getInstance(),
                    null != this._kUnzipMgr && this._kUnzipMgr.CreateUnZipTask(t, e, this._unzipCallback.bind(this)))
                }
            },
            _unzipCallback: function(t, e) {
                if (null != this._zipTaskList)
                    for (var i = 0; i < this._zipTaskList.length; ++i)
                        if (this._zipTaskList[i]._fileName == e) {
                            this._zipTaskList[i]._status = t ? "succeed" : "failed";
                            break
                        }
            },
            tick: function() {
                if (this._zipTaskList.length > 0)
                    for (var t = this._zipTaskList.length - 1; t >= 0; t--)
                        "succeed" != this._zipTaskList[t]._status && "failed" != this._zipTaskList[t]._status || (this._zipTaskList[t]._callback(this._zipTaskList[t]._status, this._zipTaskList[t]._targetPath, this._zipTaskList[t]._fileName),
                        this._zipTaskList.splice(t, 1))
            },
            zip: function() {}
        });
        yc.AppZip = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    BaseConfig: [function(t, e) {
        "use strict";
        var i;
        if (cc._RF.push(e, "c10f1rp3NdAtaqNgm58gnRM", "BaseConfig"),
        yc.buildType = "r",
        "r" == yc.buildType)
            yc.baseConfig = ((i = {
                baseVersion: "1.0",
                bundlePath: "",
                requestUrl: "http://masterdouble.hyyy3.com",
                clientDownloadUrl: "http://",
                androidDownloadUrl: "http://",
                iosDownloadUrl: "http://"
            }).bundlePath = "",
            i);
        else if ("d" == yc.buildType) {
            var n;
            yc.baseConfig = ((n = {
                baseVersion: "1.0",
                bundlePath: "",
                requestUrl: "http://47.94.198.201:8080",
                clientDownloadUrl: "http://",
                androidDownloadUrl: "http://",
                iosDownloadUrl: "http://"
            }).bundlePath = "",
            n)
        }
        cc._RF.pop()
    }
    , {}],
    BaseDefine: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b487cJg4opM2oIyDEk0HeHt", "BaseDefine"),
        yc.baseDefine = {
            android: "android"
        },
        cc._RF.pop()
    }
    , {}],
    BaseFunction: [function(t, e) {
        "use strict";
        cc._RF.push(e, "f0ed6Ijif1GTJNTiT609O4f", "BaseFunction"),
        yc.baseFunction = {
            getPlatName: function() {
                return cc.sys.isNative ? cc.sys.os == cc.sys.OS_IOS ? "ios" : cc.sys.os == cc.sys.OS_ANDROID ? "android" : void 0 : cc.sys.os == cc.sys.OS_IOS ? "iosWeb" : cc.sys.os == cc.sys.OS_ANDROID ? "androidWeb" : "windowsWeb"
            },
            getPath: function(t) {
                var e = t.lastIndexOf("/");
                return -1 != e && e < t.length && (t = t.substring(0, e)),
                t
            },
            extractFileName: function(t) {
                var e = t.lastIndexOf("/");
                return -1 != e && e < t.length && (t = t.substring(e + 1, t.length)),
                -1 != (e = t.lastIndexOf(".")) && (t = t.substring(0, e)),
                t
            },
            getFileExtensionName: function(t) {
                var e = t.lastIndexOf(".");
                return -1 != e && (t = t.substring(e + 1, t.length)),
                t
            },
            randomNum: function(t, e) {
                switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * t + 1, 10);
                case 2:
                    return parseInt(Math.random() * (e - t + 1) + t, 10);
                default:
                    return 0
                }
            },
            isWXWeb: function() {
                return 0 == cc.sys.isNative && null != localStorage.YCUserJson
            },
            isMWWeb: function() {
                return 0 == cc.sys.isNative && null != localStorage.YCMoWangUserJson
            },
            getAreaData: function(t, e) {
                for (var i = 0; i < e.area_data.length; ++i)
                    if (e.area_data[i].area_key == t)
                        return e.area_data[i];
                return null
            }
        },
        cc._RF.pop()
    }
    , {}],
    BaseMessageBox: [function(t, e) {
        "use strict";
        cc._RF.push(e, "ea57biEC8NEJZiQkDQGsYfE", "BaseMessageBox");
        var i = cc.Class({
            extends: cc.Component,
            onLoad: function() {
                this._labelTitle = this.node.getChildByName("title").getComponent(cc.Label),
                this._labelContent = this.node.getChildByName("content").getComponent(cc.Label),
                this._nodeConfirm = this.node.getChildByName("btn_confirm"),
                this._nodeCancel = this.node.getChildByName("btn_cancel"),
                this._nodeConfirm.on(cc.Node.EventType.TOUCH_END, function() {
                    null != this._funcConfirmCallback && (this._funcConfirmCallback(this._funcConfirmCallbackParam),
                    this.hide())
                }
                .bind(this)),
                this._nodeCancel.on(cc.Node.EventType.TOUCH_END, function() {
                    null != this._funcCancelCallback && (this._funcCancelCallback(this._funcCancelCallbackParam),
                    this.hide())
                }
                .bind(this)),
                this.reset()
            },
            reset: function() {
                this._eStyle = 1,
                this._strTitle = "",
                this._strContent = "",
                this._funcConfirmCallback = null,
                this._funcConfirmCallbackParam = null,
                this._funcCancelCallback = null,
                this._funcCancelCallbackParam = null
            },
            show: function(t) {
                null != t && (this.reset(),
                null == t._preLoad && (null != t._eStyle && (this._eStyle = t._eStyle),
                null == t._strTitle ? t._strTitle = "" : this._strTitle = t._strTitle,
                this._strContent = t._strContent,
                this._funcConfirmCallback = t._funcConfirmCallback,
                this._funcCancelCallback = t._funcCancelCallback,
                this._funcConfirmCallbackParam = t._funcConfirmCallbackParam,
                this._funcCancelCallbackParam = t._funcCancelCallbackParam,
                this._labelTitle.string = this._strTitle,
                this._labelContent.string = this._strContent,
                2 == this._eStyle ? (this._nodeConfirm.setPosition(0, -106),
                this._nodeCancel.active = !1) : (this._nodeCancel.active = !0,
                this._nodeConfirm.active = !0,
                this._nodeConfirm.setPosition(-154, -106),
                this._nodeCancel.setPosition(154, -106))))
            },
            hide: function() {
                this.reset(),
                this.node.active = !1
            },
            onEvent: function() {}
        });
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    BaseNotice: [function(t, e) {
        "use strict";
        var i;
        cc._RF.push(e, "809b0S7NfNLKIX6DyfwYrf6", "BaseNotice");
        var n = cc.Class({
            extends: cc.Component,
            onLoad: function() {
                i = this,
                this._oItemTemplate = this.node.getChildByName("templateItem"),
                this._oItemTemplate.active = !1,
                this._listItems = [],
                this._listItemsPool = [],
                this._storage = [],
                this._lastMsg = "",
                this._timer = 2
            },
            add: function(t) {
                null == t || t.length <= 0 || t != this._lastMsg && (this._timer = 2,
                this._lastMsg = t,
                this._storage.push(t))
            },
            fireMsg: function(t) {
                var e = this.getItem();
                this._listItems.push(e),
                this.node.addChild(e),
                e.getChildByName("context").getComponent(cc.Label).string = t,
                e.active = !0,
                e.y = -50,
                e.opacity = 0,
                this.runMsg()
            },
            has: function() {},
            runMsg: function() {
                for (var t = 0; t < i._listItems.length; t++)
                    if (t < 3) {
                        if (1 == t && i._listItems[0].y == i._listItems[1].y)
                            break;
                        if (2 == t && i._listItems[1].y == i._listItems[2].y)
                            break;
                        i._listItems[t].runAction(cc.sequence(cc.spawn(cc.moveTo(.8, cc.v2(0, 200 - 42 * t)), cc.fadeIn(.8)), cc.delayTime(.8), cc.callFunc(function(t) {
                            t.runAction(cc.sequence(cc.fadeOut(.8), cc.callFunc(function(t) {
                                t.active = !1,
                                i._listItems.splice(0, 1),
                                i.addItem(t),
                                t.removeFromParent()
                            })))
                        })))
                    }
            },
            getItem: function() {
                var t = null;
                return this._listItemsPool.length > 0 ? (t = this._listItemsPool[0],
                this._listItemsPool.splice(0, 1),
                t) : t = cc.instantiate(this._oItemTemplate)
            },
            popMsg: function() {
                if (this._storage.length <= 0)
                    return null;
                var t = this._storage[0];
                return this._storage.splice(0, 1),
                t
            },
            addItem: function(t) {
                this._listItemsPool.push(t)
            },
            getMaxHight: function() {},
            update: function(t) {
                if (i._listItems.length <= 0) {
                    var e = i.popMsg();
                    null != e && this.fireMsg(e)
                }
                this._timer = this._timer - t,
                this._timer < 0 && (this._lastMsg = "")
            }
        });
        e.exports = n,
        cc._RF.pop()
    }
    , {}],
    BasePlatformAndroidLogic: [function(t, e) {
        "use strict";
        cc._RF.push(e, "ba882kJjBVEWaWAt8cxHQsr", "BasePlatformAndroidLogic");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformAndroid: [function(t, e) {
        "use strict";
        cc._RF.push(e, "955c2g+wd9LybYmwTrqgIlE", "BasePlatformAndroid");
        var i = t("YcObject")
          , n = function() {
            this.callClassName = "com/yachuan/YC"
        };
        (n.prototype = new i).init = function() {}
        ,
        n.prototype.installBase = function(t) {
            yc.log("enter BasePlatformAndroid installBase dir_:" + t + " this.callClassName:" + this.callClassName),
            jsb.reflection.callStaticMethod(this.callClassName, "install", "(Ljava/lang/String;)V", t)
        }
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformIosLogic: [function(t, e) {
        "use strict";
        cc._RF.push(e, "3d434NDZwhJdahOzWIl+mb3", "BasePlatformIosLogic");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformIos: [function(t, e) {
        "use strict";
        cc._RF.push(e, "60025e1nZFCC4Gos3a8hLgR", "BasePlatformIos");
        var i = t("YcObject")
          , n = function() {
            this.callClassName = "YC"
        };
        (n.prototype = new i).init = function() {}
        ,
        n.prototype.installBase = function(t) {
            jsb.reflection.callStaticMethod(this.callClassName, "openBrowser:", t)
        }
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformLogic: [function(t, e) {
        "use strict";
        cc._RF.push(e, "2f1b4JzyiJBmqpuDdNJ3Hxr", "BasePlatformLogic");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {
            var e = null;
            cc.sys.isNative ? "android" == yc.baseFunction.getPlatName() ? e = t("BasePlatformAndroidLogic") : "ios" == yc.baseFunction.getPlatName() && (e = t("BasePlatformIosLogic")) : e = t("BasePlatformWebLogic"),
            this._platformLogic = new e
        }
        ,
        n.prototype.onEnterApp = function() {}
        ,
        n.prototype.onEnterClient = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        BasePlatformAndroidLogic: "BasePlatformAndroidLogic",
        BasePlatformIosLogic: "BasePlatformIosLogic",
        BasePlatformWebLogic: "BasePlatformWebLogic",
        YcObject: "YcObject"
    }],
    BasePlatformWebLogic: [function(t, e) {
        "use strict";
        cc._RF.push(e, "48da0AtL7dCmJic2Uf8Cw1P", "BasePlatformWebLogic");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformWeb: [function(t, e) {
        "use strict";
        cc._RF.push(e, "72bcfBkwmhFfr7UQ3uBjMv7", "BasePlatformWeb");
        var i = t("YcObject")
          , n = function() {};
        if (!cc.sys.isNative && "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
            var s = cc.view._initFrameSize;
            cc.view._initFrameSize = function() {
                s.apply(cc.view, arguments),
                cc.view._isRotated && (cc.game.container.style["-webkit-transform"] = "rotate(-90deg)",
                cc.game.container.style.transform = "rotate(-90deg)",
                setTimeout(function() {
                    cc.game.container.style.margin = cc.view._frameSize.width + "px 0px 0px"
                }),
                cc.view.convertToLocationInView = function(t, e, i, n) {
                    i.left = i.width,
                    i.top = -i.height;
                    var s = n || cc.v2()
                      , o = this._devicePixelRatio * (t - i.left)
                      , a = this._devicePixelRatio * (i.top + i.height - e);
                    return this._isRotated ? (s.x = cc.game.canvas.width + a,
                    s.y = -o) : (s.x = o,
                    s.y = a),
                    s
                }
                )
            }
        }
        (n.prototype = new i).init = function() {}
        ,
        n.prototype.installBase = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformWindowsLogic: [function(t, e) {
        "use strict";
        cc._RF.push(e, "a245eA2bU1M0YwBcEHM+QBj", "BasePlatformWindowsLogic");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatformWindows: [function(t, e) {
        "use strict";
        cc._RF.push(e, "2b8eetzBtZBj4oesKx4vAy+", "BasePlatformWindows");
        var i = t("YcObject")
          , n = function() {};
        (n.prototype = new i).init = function() {}
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        YcObject: "YcObject"
    }],
    BasePlatform: [function(t, e) {
        "use strict";
        cc._RF.push(e, "9a016ZT7alDDLhtHnq55ULh", "BasePlatform");
        var i = t("YcObject")
          , n = function() {
            this.functionList = {}
        };
        (n.prototype = new i).init = function() {
            var e = null;
            cc.sys.isNative ? "android" == yc.baseFunction.getPlatName() ? e = t("BasePlatformAndroid") : "ios" == yc.baseFunction.getPlatName() && (e = t("BasePlatformIos")) : e = t("BasePlatformWeb"),
            this._platform = new e
        }
        ,
        n.prototype.nativeCallback = function(t) {
            var e;
            if (null != (e = "string" == typeof t ? JSON.parse(t) : t) && null != e.func && null != this.functionList[e.func])
                for (var i = 0; i < this.functionList[e.func].length; ++i)
                    this.functionList[e.func][i](e.para)
        }
        ,
        n.prototype.register = function(t, e) {
            null == this.functionList[t] ? this.functionList[t] = [e] : this.functionList[t].push(e)
        }
        ,
        n.prototype.unregister = function(t, e) {
            if (null != this.functionList[t])
                for (var i = 0; i < this.functionList[t].length; ++i)
                    if (e == this.functionList[t][i]) {
                        this.functionList[t].slice(i, 1);
                        break
                    }
        }
        ,
        n.prototype.installBase = function(t) {
            this._platform.installBase(t)
        }
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {
        BasePlatformAndroid: "BasePlatformAndroid",
        BasePlatformIos: "BasePlatformIos",
        BasePlatformWeb: "BasePlatformWeb",
        YcObject: "YcObject"
    }],
    BaseWaiting: [function(t, e) {
        "use strict";
        cc._RF.push(e, "c16f7ty/lpEoadoJEC8Vxpq", "BaseWaiting");
        var i = cc.Class({
            extends: cc.Component,
            onLoad: function() {
                this._strDesc = this.node.getChildByName("desc").getComponent(cc.Label)
            },
            onEvent: function() {},
            show: function(t) {
                this.node.active = !0,
                null != t && (this._strDesc.string = t)
            },
            hide: function() {
                this.node.active = !1
            }
        });
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    Base: [function(t, e) {
        "use strict";
        cc._RF.push(e, "53723xTXipJqIpLEA3IcgiW", "Base"),
        t("Yc");
        var i = t("Http")
          , n = cc.Class({
            extends: yc.YcObject,
            init: function() {
                yc.registerTick = this.registerTick.bind(this),
                yc.unregisterTick = this.unregisterTick.bind(this);
                var e = t("CommonUI");
                this._commonUI = new e,
                yc.showWaitting = this._commonUI.showWaitting.bind(this._commonUI),
                yc.hideWaitting = this._commonUI.hideWaitting.bind(this._commonUI),
                yc.showNotice = this._commonUI.showNotice.bind(this._commonUI),
                yc.showMessageBox = this._commonUI.showMessageBox.bind(this._commonUI),
                yc.showUpdatePanel = this._commonUI.showUpdatePanel.bind(this._commonUI),
                yc.hideUpdatePanel = this._commonUI.hideUpdatePanel.bind(this._commonUI),
                yc.setUpdateProgress = this._commonUI.setUpdateProgress.bind(this._commonUI),
                yc.showSelectAreaPanel = this._commonUI.showSelectAreaPanel.bind(this._commonUI);
                var i = t("BasePlatform")
                  , n = t("BasePlatformLogic");
                yc.platform = new i,
                yc.platform.init(),
                yc.platformLogic = new n,
                yc.platformLogic.init(),
                this._tickList = [],
                this._registerTickList = [],
                this._untickList = [];
                var s = null;
                cc.sys.isNative ? (t("AppBaseImpl"),
                s = yc.AppBaseImpl) : (t("WebBaseImpl"),
                s = yc.WebBaseImpl),
                this._impl = new s,
                this._impl.init()
            },
            loadConfig: function() {
                return new Promise(function(t) {
                    cc.resources.load("config", function(e, i) {
                        null == e ? (yc.localConfig = i.json,
                        yc.printObject(yc.localConfig, "localConfig:"),
                        t()) : yc.error("loadConfig failed fileNam:config.json")
                    })
                }
                )
            },
            run: function() {
                var t = this;
                this.loadConfig().then(function() {
                    yc.platformLogic.onEnterApp(),
                    t.getBaseInfo(t.onBaseInfo.bind(t))
                })
            },
            tick: function(t) {
                if (null != this._Impl && this._Impl.tick(t),
                this._tickList.length > 0)
                    for (var e = [].concat(this._tickList), i = 0; i < e.length; ++i)
                        e[i].tick(t)
            },
            registerTick: function(t) {
                for (var e = 0; e < this._tickList.length; ++e)
                    if (this._tickList[e] == t)
                        return;
                this._tickList.push(t)
            },
            unregisterTick: function(t) {
                for (var e = 0; e < this._tickList.length; ++e)
                    if (this._tickList[e] == t)
                        return void this._tickList.splice(e, 1)
            },
            getBaseInfo: function(t) {
                var e = this;
                e._httpFinished = !1,
                e._getBaseInfoCallback = t,
                i.get(yc.baseConfig.requestUrl + "/WS/MobileInterface.ashx", "/get", "action=getappmessage", function(t, i) {
                    if (t)
                        return yc.log(t + "AppBaseImpl getBaseInfo requestUrl:" + yc.baseConfig.requestUrl),
                        void e._getBaseInfoCallback(!1);
                    i && 0 == e._httpFinished && (e._httpFinished = !0,
                    e._getBaseInfoCallback(!0, i))
                })
            },
            onBaseInfo: function(t, e) {
                if (yc.log("Base onBaseInfo result_:" + t),
                0 == t)
                    return yc.error("getBaseInfo failed"),
                    void yc.showMessageBox("\u8fde\u63a5\u7f51\u7edc\u5931\u8d25\uff0c\u8bf7\u68c0\u6d4b\u7f51\u7edc\uff0c\u662f\u5426\u91cd\u8bd5\uff1f", "\u63d0\u793a", function() {
                        this.getBaseInfo(this.onBaseInfo.bind(this))
                    }
                    .bind(this), function() {
                        cc.game.end()
                    }, 1);
                if (0 != e.code)
                    return yc.error("getBaseInfo failed"),
                    void yc.showMessageBox("\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458Code:" + e.code, "\u63d0\u793a", function() {}
                    .bind(this), function() {
                        cc.game.end()
                    }, 1);
                yc.baseInfo = e,
                yc.baseConfig.androidDownloadUrl = yc.baseInfo.android_download_url,
                yc.baseConfig.iosDownloadUrl = yc.baseInfo.ios_download_url,
                yc.baseInfo.clientversion = yc.baseInfo.app_version,
                yc.log(JSON.stringify(yc.baseInfo));
                var i = function() {
                    this.enterClient()
                }
                .bind(this);
                this.versionCheck(i)
            },
            versionCheck: function(t) {
                this._impl.versionCheck(t)
            },
            enterClient: function() {
                yc.Resource.loadBundle(yc.baseConfig.bundlePath + "client", function(t, e) {
                    null == t ? e.load("res/platform", cc.Prefab, function(t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.parent = yc.rootNode;
                            var n = yc.rootNode.getChildByName("common_ui")
                              , s = n.getSiblingIndex()
                              , o = i.getSiblingIndex();
                            i.setSiblingIndex(s),
                            n.setSiblingIndex(o)
                        } else
                            yc.error("load failed res/platform ret_:" + t)
                    }
                    .bind(this)) : yc.error("load bundle failed path:" + yc.baseConfig.bundlePath + "client error_:" + t)
                }
                .bind(this))
            }
        });
        yc.Base = e.exports = n,
        cc._RF.pop()
    }
    , {
        AppBaseImpl: "AppBaseImpl",
        BasePlatform: "BasePlatform",
        BasePlatformLogic: "BasePlatformLogic",
        CommonUI: "CommonUI",
        Http: "Http",
        WebBaseImpl: "WebBaseImpl",
        Yc: "Yc"
    }],
    BundlePath: [function(t, e) {
        "use strict";
        cc._RF.push(e, "3fc59hoReJGSofuTVqi0D9O", "BundlePath");
        var i = cc.Class({
            extends: cc.Component,
            ctor: function() {
                this._name = arguments[0],
                this._bundle = arguments[1],
                this._resourceList = [],
                this._resourceLoadingList = [],
                this._resCompletedWillCallList = []
            },
            had: function(t, e) {
                for (var i = 0; i < this._resourceList.length; ++i)
                    if (this._resourceList[i]._dir == t && this._resourceList[i]._resType == e)
                        return this._resourceList[i];
                return null
            },
            hadLoading: function(t, e) {
                for (var i = 0; i < this._resourceLoadingList.length; ++i)
                    if (this._resourceLoadingList[i]._dir == t && this._resourceLoadingList[i]._resType == e)
                        return this._resourceLoadingList[i];
                return null
            },
            removeLoading: function(t) {
                for (var e = 0; e < this._resourceLoadingList.length; ++e)
                    if (this._resourceLoadingList[e] == t) {
                        this._resourceLoadingList.splice(e, 1);
                        break
                    }
                return null
            },
            loadResource: function(t, e, i, n) {
                var s = null
                  , o = this.had(t, e);
                if (null != o)
                    return (s = {})._status = "succeed",
                    s._dir = t,
                    s._resType = e,
                    s._res = o._res,
                    s._callback = i,
                    this._resCompletedWillCallList.push(s),
                    s;
                var a = this.hadLoading(t, e);
                if (null != a)
                    return a._callbacks.push(i),
                    a;
                (a = {})._dir = t,
                a._resType = e,
                a._status = "loading",
                a._callbacks = [],
                a._callbacks.push(i),
                a._loadedCallback = function(i, n) {
                    var s = !0;
                    if (null != i && (s = !1),
                    1 == s) {
                        var o = {};
                        o._dir = t,
                        o._resType = e,
                        o._res = n,
                        this._resourceList.push(o)
                    }
                    for (var c = 0; c < a._callbacks.length; ++c)
                        a._callbacks[c](i, n, a);
                    this.removeLoading(a)
                }
                .bind(this),
                n ? bundle1.loadDir(t, e, a._loadedCallback) : this._bundle.load(t, e, a._loadedCallback)
            },
            load: function(t, e, i) {
                this.loadResource(t, e, i, !1)
            },
            loadDir: function(t, e, i) {
                this.loadResource(t, e, i, !0)
            },
            loadPrefab: function(t, e) {
                this.load(t, cc.prefab, e)
            },
            loadPrefabDir: function(t, e) {
                this.loadDir(t, cc.prefab, e)
            },
            tick: function() {
                if (this._resCompletedWillCallList.length > 0) {
                    for (var t = 0; t < this._resCompletedWillCallList.length; ++t)
                        this._resCompletedWillCallList[t]._callback(null, this._resCompletedWillCallList[t]._res, this._resCompletedWillCallList[t]);
                    this._resCompletedWillCallList = []
                }
            },
            release: function() {},
            loadResList: function(t, e, i) {
                var n = {};
                n._resPathList = t,
                n._resTotalCount = t.length,
                n._resCompletedCount = 0,
                n._funcProgressCallback = i,
                n._funcCompletedCallback = e,
                n._resLoadingInfo = [];
                for (var s = 0; s < t.length; ++s) {
                    var o = this.loadForResList(n, t[s]._resPath, t[s]._resType, s);
                    n._resLoadingInfo.push(o)
                }
                return n
            },
            loadForResList: function(t, e, i, n) {
                return this.load(e, i, function(e, i) {
                    ++t._resCompletedCount,
                    t._resPathList[n]._res = i._res,
                    null != t._funcProgressCallback && t._funcProgressCallback(t._resCompletedCount / t._resTotalCount),
                    t._resCompletedCount >= t._resTotalCount && t._funcCompletedCallback(t)
                })
            },
            cancelResList: function(t) {
                if (null != t && null != t._resLoadingInfo)
                    for (var e = 0; e < t._resLoadingInfo.length; ++e)
                        this.cancelLoad(t._resLoadingInfo[e])
            },
            releaseResList: function(t, e) {
                if (!(null == t || null == t.length || t.length <= 0))
                    for (var i = null != e && e, n = 0; n < t.length; ++n)
                        this.release(t[n]._resPath, i)
            },
            cancelLoad: function(t) {
                null != t && (t._resState = "cancel");
                for (var e = 0; e < this._resCompletedWillCallList.length; ++e)
                    if (this._resCompletedWillCallList[e] == t) {
                        this.release(t._resPath),
                        this._resCompletedWillCallList.splice(e, 1);
                        break
                    }
                return !0
            },
            loadScene: function(t, e) {
                this._bundle.loadScene(t, function(t, i) {
                    e(t, i)
                })
            }
        });
        yc.Bundle = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    Bundle: [function(t, e) {
        "use strict";
        cc._RF.push(e, "c0d04FxfvBKwKGefXBHc5Uc", "Bundle");
        var i = cc.Class({
            extends: cc.Component,
            ctor: function() {
                this._name = arguments[0],
                this._bundle = arguments[1],
                this._resourceList = [],
                this._resourceLoadingList = [],
                this._resCompletedWillCallList = []
            },
            had: function(t, e) {
                for (var i = 0; i < this._resourceList.length; ++i)
                    if (this._resourceList[i]._dir == t && this._resourceList[i]._resType == e)
                        return this._resourceList[i];
                return null
            },
            hadLoading: function(t, e) {
                for (var i = 0; i < this._resourceLoadingList.length; ++i)
                    if (this._resourceLoadingList[i]._dir == t && this._resourceLoadingList[i]._resType == e)
                        return this._resourceLoadingList[i];
                return null
            },
            removeLoading: function(t) {
                for (var e = 0; e < this._resourceLoadingList.length; ++e)
                    if (this._resourceLoadingList[e] == t) {
                        this._resourceLoadingList.splice(e, 1);
                        break
                    }
                return null
            },
            loadResource: function(t, e, i, n) {
                var s = null
                  , o = this.had(t, e);
                if (null != o)
                    return (s = {})._status = "succeed",
                    s._dir = t,
                    s._resType = e,
                    s._res = o._res,
                    s._callback = i,
                    this._resCompletedWillCallList.push(s),
                    s;
                var a = this.hadLoading(t, e);
                if (null != a)
                    return a._callbacks.push(i),
                    a;
                (a = {})._dir = t,
                a._resType = e,
                a._status = "loading",
                a._callbacks = [],
                a._callbacks.push(i),
                a._loadedCallback = function(i, n) {
                    var s = !0;
                    if (null != i && (s = !1),
                    1 == s) {
                        var o = {};
                        o._dir = t,
                        o._resType = e,
                        o._res = n,
                        this._resourceList.push(o)
                    }
                    for (var c = 0; c < a._callbacks.length; ++c)
                        a._callbacks[c](i, n, a);
                    this.removeLoading(a)
                }
                .bind(this),
                n ? bundle1.loadDir(t, e, a._loadedCallback) : this._bundle.load(t, e, a._loadedCallback)
            },
            load: function(t, e, i) {
                this.loadResource(t, e, i, !1)
            },
            loadDir: function(t, e, i) {
                this.loadResource(t, e, i, !0)
            },
            loadPrefab: function(t, e) {
                this.load(t, cc.prefab, e)
            },
            loadPrefabDir: function(t, e) {
                this.loadDir(t, cc.prefab, e)
            },
            tick: function() {
                if (this._resCompletedWillCallList.length > 0) {
                    for (var t = 0; t < this._resCompletedWillCallList.length; ++t)
                        this._resCompletedWillCallList[t]._callback(null, this._resCompletedWillCallList[t]._res, this._resCompletedWillCallList[t]);
                    this._resCompletedWillCallList = []
                }
            },
            release: function() {},
            loadResList: function(t, e, i) {
                var n = {};
                n._resPathList = t,
                n._resTotalCount = t.length,
                n._resCompletedCount = 0,
                n._funcProgressCallback = i,
                n._funcCompletedCallback = e,
                n._resLoadingInfo = [];
                for (var s = 0; s < t.length; ++s) {
                    var o = this.loadForResList(n, t[s]._resPath, t[s]._resType, s);
                    n._resLoadingInfo.push(o)
                }
                return n
            },
            loadForResList: function(t, e, i, n) {
                return this.load(e, i, function(e, i) {
                    ++t._resCompletedCount,
                    t._resPathList[n]._res = i._res,
                    null != t._funcProgressCallback && t._funcProgressCallback(t._resCompletedCount / t._resTotalCount),
                    t._resCompletedCount >= t._resTotalCount && t._funcCompletedCallback(t)
                })
            },
            cancelResList: function(t) {
                if (null != t && null != t._resLoadingInfo)
                    for (var e = 0; e < t._resLoadingInfo.length; ++e)
                        this.cancelLoad(t._resLoadingInfo[e])
            },
            releaseResList: function(t, e) {
                if (!(null == t || null == t.length || t.length <= 0))
                    for (var i = null != e && e, n = 0; n < t.length; ++n)
                        this.release(t[n]._resPath, i)
            },
            cancelLoad: function(t) {
                null != t && (t._resState = "cancel");
                for (var e = 0; e < this._resCompletedWillCallList.length; ++e)
                    if (this._resCompletedWillCallList[e] == t) {
                        this.release(t._resPath),
                        this._resCompletedWillCallList.splice(e, 1);
                        break
                    }
                return !0
            },
            loadScene: function(t, e) {
                this._bundle.loadScene(t, function(t, i) {
                    e(t, i)
                })
            }
        });
        yc.Bundle = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    CharMapping: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b87deCw4+pJzazoYz/In+IK", "CharMapping");
        var i = function() {};
        i.prototype._randomNum = function(t, e) {
            switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * t + 1, 10);
            case 2:
                return parseInt(Math.random() * (e - t + 1) + t, 10);
            default:
                return 0
            }
        }
        ,
        i.prototype.init = function() {
            this._srcChar = "abcdefghijklmnopqrstuvwxyz1234567890",
            this.encodeChar = {
                7: "0",
                g: "1",
                6: "2",
                b: "3",
                p: "4",
                s: "5",
                n: "6",
                a: "7",
                d: "8",
                e: "9",
                o: "a",
                9: "b",
                w: "c",
                h: "d",
                1: "e",
                0: "f",
                y: "g",
                x: "h",
                f: "i",
                8: "j",
                l: "k",
                z: "l",
                u: "m",
                k: "n",
                q: "o",
                r: "p",
                5: "q",
                v: "r",
                4: "s",
                j: "t",
                2: "u",
                3: "v",
                m: "w",
                t: "x",
                c: "y",
                i: "z"
            },
            this.decodeChar = {
                0: "7",
                1: "g",
                2: "6",
                3: "b",
                4: "p",
                5: "s",
                6: "n",
                7: "a",
                8: "d",
                9: "e",
                a: "o",
                b: "9",
                c: "w",
                d: "h",
                e: "1",
                f: "0",
                g: "y",
                h: "x",
                i: "f",
                j: "8",
                k: "l",
                l: "z",
                m: "u",
                n: "k",
                o: "q",
                p: "r",
                q: "5",
                r: "v",
                s: "4",
                t: "j",
                u: "2",
                v: "3",
                w: "m",
                x: "t",
                y: "c",
                z: "i"
            }
        }
        ,
        i.prototype.generateMapping = function() {
            for (srcChar1 = "abcdefghijklmnopqrstuvwxyz1234567890",
            srcChar2 = "abcdefghijklmnopqrstuvwxyz1234567890",
            this.encodeChar = {},
            this.decodeChar = {}; srcChar1.length > 0; ) {
                var t = ""
                  , e = "";
                if (srcChar1.length > 1) {
                    t = srcChar1[0];
                    var i = this.randomNum(0, srcChar2.length - 1);
                    e = srcChar2[i],
                    srcChar1 = srcChar1.replace(srcChar1[0], ""),
                    srcChar2 = srcChar2.replace(e, "")
                } else
                    t = srcChar1[0],
                    e = srcChar2[0],
                    srcChar1 = "";
                this.encodeChar[t] = e,
                this.decodeChar[e] = t
            }
        }
        ,
        i.prototype.encode = function(t) {
            return this.mapping(t, this.encodeChar)
        }
        ,
        i.prototype.decode = function(t) {
            return this.mapping(t, this.decodeChar)
        }
        ,
        i.prototype.mapping = function(t, e) {
            if (t.length <= 0)
                return !1;
            for (var i = "", n = 0; n < t.length; ++n) {
                if (0 == this.valid(t[n]))
                    return !1;
                i += e[t[n]]
            }
            return i
        }
        ,
        i.prototype.valid = function(t) {
            for (var e = 0; e < this._srcChar.length; ++e)
                if (this._srcChar[e] == t)
                    return !0;
            return !1
        }
        ,
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    ClientUpdate: [function(t, e) {
        "use strict";
        cc._RF.push(e, "83f52KZCxFFv65TKf7Hd2Ir", "ClientUpdate");
        var i = cc.Class({
            extends: yc.YcObject,
            ctor: function() {
                this._storagePath = jsb.fileUtils.getWritablePath(),
                this._downloading = !1
            },
            showUpdatePanel: function(t) {
                yc.showUpdatePanel(t)
            },
            hideUpdatePanel: function() {
                yc.hideUpdatePanel()
            },
            updateProgress: function(t) {
                t *= this._curTaskCount / this._totalTaskCount,
                yc.setUpdateProgress(t)
            },
            downClient: function(t) {
                this._baseUpdatedCallback = t,
                this._downloading = !0,
                this.showUpdatePanel("\u6e38\u620f\u8d44\u6e90\u52a0\u8f7d\u4e2d");
                var e = (new Date).getTime()
                  , i = yc.baseConfig.clientDownloadUrl + "client.zip?time=" + e
                  , n = this._storagePath + "downloader/remote/client.zip";
                this._totalTaskCount = 1,
                this._curTaskCount = 1;
                var s = this;
                this._download = new yc.AppDownloader;
                var o = function() {
                    var t = function() {
                        yc.unregisterTick(this._zip),
                        this._downloading = !1,
                        this.hideUpdatePanel(),
                        s._baseUpdatedCallback(!0)
                    }
                    .bind(this);
                    s._zip = new yc.AppZip,
                    yc.registerTick(s._zip),
                    this._zip.unzip(n, yc.baseConfig.bundlePath, t)
                }
                .bind(this)
                  , a = function(t) {
                    this.updateProgress(t)
                }
                .bind(this)
                  , c = function(t) {
                    yc.printObject(t, "ClientUpdate onError task_:"),
                    this._downloading = !1,
                    this.hideUpdatePanel(),
                    this._baseUpdatedCallback(!1)
                }
                .bind(this)
                  , r = []
                  , l = {};
                l._url = i,
                l._desPath = n,
                r.push(l),
                this._download.downloadList(r, o, a, c)
            },
            tick: function() {},
            updateClient: function(t) {
                yc.logObject(jsb.fileUtils),
                this._updateClientCallback = t,
                this._downloading = !0,
                this.showUpdatePanel("\u66f4\u65b0\u5927\u5385\u8d44\u6e90");
                var e = yc.baseConfig.bundlePath + "client/filemd5List.json";
                this._localMd5List = null,
                this._remoteMd5List = null;
                var i = (new Date).getTime();
                this._totalTaskCount = 3,
                this._curTaskCount = 1,
                this._checkComparefunc = function() {
                    if (null != this._localMd5List && null != this._remoteMd5List) {
                        this._curTaskCount = 2;
                        for (var t = [], n = 0; n < this._localMd5List.listdata.length; ++n) {
                            for (var s = !0, o = this._localMd5List.listdata[n].path + this._localMd5List.listdata[n].name, a = 0; a < this._remoteMd5List.listdata.length; ++a)
                                if (o == this._remoteMd5List.listdata[a].path + this._remoteMd5List.listdata[a].name) {
                                    s = !1;
                                    break
                                }
                            s && t.push(o)
                        }
                        for (var c = [], r = 0; r < this._remoteMd5List.listdata.length; ++r) {
                            for (var l = !0, u = this._remoteMd5List.listdata[r].path + this._remoteMd5List.listdata[r].name, h = this._remoteMd5List.listdata[r].md5, d = 0; d < this._localMd5List.listdata.length; ++d)
                                if (u == this._localMd5List.listdata[d].path + this._localMd5List.listdata[d].name) {
                                    h == this._localMd5List.listdata[d].md5 && (l = !1);
                                    break
                                }
                            if (l) {
                                var f = {};
                                f._url = yc.baseConfig.clientDownloadUrl + u + "?time=" + i,
                                f._desPath = this._storagePath + "remote/" + u,
                                c.push(f)
                            }
                        }
                        for (var p = function(t) {
                            if (this._downloading = !1,
                            this.hideUpdatePanel(),
                            t) {
                                var i = JSON.stringify(this._remoteMd5List);
                                jsb.fileUtils.writeStringToFile(i, e),
                                this._updateClientCallback(!0)
                            } else
                                this._updateClientCallback(!1)
                        }
                        .bind(this), _ = 0; _ < t.length; ++_)
                            this.updateProgress(_ / t.length),
                            jsb.fileUtils.removeFile(t[_]);
                        this._curTaskCount = 3,
                        c.length > 0 ? this.downloadFiles(c, p) : p(!0)
                    }
                }
                .bind(this),
                this.updateProgress(.5),
                yc.Resource.load(e, function(t, e) {
                    if (null != t)
                        return this._downloading = !1,
                        this.hideUpdatePanel(),
                        void this._updateClientCallback(!1);
                    this._localMd5List = e.json,
                    this._checkComparefunc()
                }
                .bind(this));
                var n = yc.baseConfig.clientDownloadUrl + "client/filemd5List.json?time=" + i;
                yc.Resource.load(n, function(t, e) {
                    if (null != t)
                        return this._downloading = !1,
                        this.hideUpdatePanel(),
                        void this._updateClientCallback(!1);
                    this._remoteMd5List = e.json,
                    this._checkComparefunc()
                }
                .bind(this))
            },
            downloadFiles: function(t, e) {
                this._download = new yc.AppDownloader;
                var i = function() {
                    e(!0)
                }
                .bind(this)
                  , n = function(t) {
                    this.updateProgress(t)
                }
                .bind(this)
                  , s = function(t) {
                    yc.printObject(t, "ClientUpdate onError task_:"),
                    e(!1)
                }
                .bind(this);
                this._download.downloadList(t, i, n, s)
            }
        });
        yc.ClientUpdate = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    CommonUI: [function(t, e) {
        "use strict";
        cc._RF.push(e, "e0c01NoJY5ITo3sc53eJOlc", "CommonUI");
        var i = cc.Class({
            showWaitting: function(t) {
                null == t && (t = ""),
                null == this._waittingUI && (this._waittingUI = yc.rootNode.getChildByName("common_ui").getChildByName("waiting").getComponent("BaseWaiting")),
                this._waittingUI.show(t)
            },
            hideWaitting: function() {
                null != this._waittingUI && this._waittingUI.hide()
            },
            showNotice: function(t) {
                null == this._noticeUI && (this._noticeUI = yc.rootNode.getChildByName("common_ui").getChildByName("toast").getComponent("BaseNotice"),
                this._noticeUI.node.active = !0),
                null == t || t.length <= 0 || this._noticeUI.add(t)
            },
            showMessageBox: function(t, e, i, n, s, o, a) {
                var c = {};
                c._eStyle = s,
                c._strTitle = null == e ? "" : e,
                c._strContent = t,
                c._funcConfirmCallback = i,
                c._funcCancelCallback = n,
                c._funcConfirmCallbackParam = o,
                c._funcCancelCallbackParam = a,
                null == this._messageBoxUI ? (this._messageBoxUI = yc.rootNode.getChildByName("common_ui").getChildByName("messagebox").getComponent("BaseMessageBox"),
                this._messageBoxUI.node.active = !0) : this._messageBoxUI.node.active = !0,
                this._messageBoxUI.show(c)
            },
            showUpdatePanel: function(t) {
                this._updatePanelShow = !0,
                null == this._checkerUI ? cc.resources.load("res/ui/prefab/version_panel", function(e, i) {
                    if (null == e) {
                        var n = cc.instantiate(i)
                          , s = yc.rootNode.getChildByName("common_ui");
                        n.parent = s,
                        this._checkerUI = n.getComponent("VersionCheckerUI"),
                        this._checkerUI.node.active = this._updatePanelShow;
                        for (var o = 0; o < s.children.length; ++o)
                            s.children[o].zIndex = s.children.length - o,
                            s.children[o].setSiblingIndex(s.children.length - o);
                        this._checkerUI.startUpdate(t)
                    } else
                        yc.error("loadConfig failed fileNam: res/ui/prefab/version_panel")
                }
                .bind(this)) : (this._checkerUI.node.active = !0,
                this._checkerUI.startUpdate(t))
            },
            hideUpdatePanel: function() {
                this._updatePanelShow = !1,
                null != this._checkerUI && (this._checkerUI.node.active = !1)
            },
            setUpdateProgress: function(t) {
                null != this._checkerUI && this._checkerUI.setProgress(t)
            },
            showSelectAreaPanel: function(t) {
                cc.resources.load("res/ui/prefab/select_area", function(e, i) {
                    if (null == e) {
                        var n = cc.instantiate(i)
                          , s = yc.rootNode.getChildByName("common_ui");
                        n.parent = s,
                        this._selectPanel = n.getComponent("SelectArea"),
                        this._selectPanel.show(t);
                        for (var o = 0; o < s.children.length; ++o)
                            s.children[o].zIndex = s.children.length - o,
                            s.children[o].setSiblingIndex(s.children.length - o)
                    } else
                        yc.error("loadConfig failed fileNam:config.json")
                }
                .bind(this))
            }
        });
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    Http: [function(t, e) {
        "use strict";
        cc._RF.push(e, "abc83G7KnVIWaxgQJk1HLJA", "Http");
        var i = {
            get: function(t, e, i, n) {
                var s = new XMLHttpRequest;
                s.ontimeout = function() {
                    console.error("The request for " + t + " timed out."),
                    n("timeout", null)
                }
                ,
                s.onerror = function() {
                    console.error("The request for " + t + " timed out."),
                    n("conntect failed", null)
                }
                ,
                s.timeout = 5e3;
                var o = t + e;
                return i && (o = o + "?" + i),
                s.open("get", o, !0),
                cc.sys.isNative && s.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8"),
                s.onreadystatechange = function() {
                    if (4 == s.readyState && s.status >= 200 && s.status < 300)
                        try {
                            var t = JSON.parse(s.responseText);
                            n && n(null, t)
                        } catch (e) {
                            cc.log("err:" + e),
                            n(e, null)
                        }
                }
                ,
                s.send(),
                s
            },
            post: function(t, e, i, n, s) {
                var o = cc.loader.getXMLHttpRequest();
                o.timeout = 5e3;
                var a = t + e;
                return i && (a = a + "?" + i),
                o.open("POST", a, !0),
                cc.sys.isNative && o.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8"),
                n && o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                o.onreadystatechange = function() {
                    if (4 == o.readyState && o.status >= 200 && o.status < 300) {
                        console.log("http res(" + o.responseText.length + "):" + o.responseText);
                        try {
                            var t = o.responseText;
                            s && s(null, t)
                        } catch (e) {
                            console.log("err:" + e),
                            s(e, null)
                        }
                    }
                }
                ,
                n && o.send(n),
                o
            },
            download: function(t, e, i, n) {
                var s = cc.loader.getXMLHttpRequest();
                s.timeout = 5e3;
                var o = t + e;
                return i && (o = o + "?" + i),
                s.responseType = "arraybuffer",
                s.open("GET", o, !0),
                cc.sys.isNative && s.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8"),
                s.onreadystatechange = function() {
                    if (4 == s.readyState && s.status >= 200 && s.status < 300) {
                        var t = s.response
                          , e = new Uint8Array(t);
                        n(null, e)
                    }
                }
                ,
                s.send(),
                s
            },
            getJson: function(t, e, i, n) {
                var s = new XMLHttpRequest;
                s.timeout = 5e3;
                var o = t + e;
                return i && (o = o + "?" + i),
                s.open("get", o, !0),
                cc.sys.isNative && s.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8"),
                s.onreadystatechange = function() {
                    if (4 == s.readyState && s.status >= 200 && s.status < 300)
                        try {
                            var t = JSON.parse(s.responseText);
                            n && n(null, t)
                        } catch (e) {
                            cc.log("err:" + e),
                            n(e, null)
                        }
                }
                ,
                s.send(),
                s
            }
        };
        e.exports = i,
        cc._RF.pop()
    }
    , {}],
    Launcher: [function(t, e) {
        "use strict";
        cc._RF.push(e, "116f3vh131FtJQb/DNP+LQu", "Launcher"),
        cc.Class({
            extends: cc.Component,
            onLoad: function() {
                yc.rootNode = this.node,
                this._base = new yc.Base,
                this._base.init()
            },
            start: function() {
                this._base.run()
            },
            update: function(t) {
                this._base.tick(t)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    Log: [function(t, e) {
        "use strict";
        cc._RF.push(e, "9f19et0SidHMai4SALFPeFt", "Log"),
        yc.log = function(t) {
            console.log("[log-l]" + t)
        }
        ,
        yc.error = function(t) {
            console.error("[log-e]" + t)
        }
        ,
        yc.warning = function(t) {
            console.warning("[log-w]" + t)
        }
        ,
        yc.printObject = function(t, e) {
            null != t ? "object" == typeof t && (null == e && (e = ""),
            console.log("log-" + e, t)) : console.error("printObject object_ == null")
        }
        ,
        yc.logObject = function(t) {
            console.log("log--object\uff1a", t)
        }
        ,
        cc._RF.pop()
    }
    , {}],
    Resource: [function(t, e) {
        "use strict";
        cc._RF.push(e, "e95c6HC4vJILayUDr6PxuHv", "Resource"),
        t("Bundle"),
        yc.Resource = {
            _bundleList: [],
            _loadList: [],
            _completeList: [],
            getBundle: function(t) {
                for (var e = 0; e < this._bundleList.length; ++e) {
                    var i = this._bundleList[e];
                    if (null != i && i._name == t)
                        return i
                }
                return null
            },
            getLoadItem: function(t) {
                for (var e = 0; e < this._loadList.length; ++e) {
                    var i = this._loadList[e];
                    if (null != i && i._name == t)
                        return i
                }
                return null
            },
            loadBundle: function(t, e, i) {
                var n = null
                  , s = t
                  , o = yc.baseFunction.extractFileName(s)
                  , a = this.getBundle(o);
                return null != a ? ((n = {})._status = "succeed",
                n._bundle = a,
                n._callbacks = [],
                n._params = [],
                n._callbacks.push(e),
                n._params.push(i),
                this._completeList.push(n),
                n) : null != (n = this.getLoadItem(o)) ? (n._callbacks.push(e),
                n._params.push(i),
                n) : ((n = {})._status = "loading",
                n._bundle = null,
                n._callbacks = [],
                n._params = [],
                n._name = o,
                n._callbacks.push(e),
                n._params.push(i),
                n._loadedCallback = function(t, e) {
                    if (t)
                        return n._status = "failed",
                        yc.error("loadBundle failed : " + s + " error:" + t);
                    n._status = "succeed";
                    var i = new yc.Bundle(o,e);
                    n._bundle = i,
                    this._bundleList.push(i),
                    yc.registerTick(i);
                    for (var a = 0; a < n._callbacks.length; ++a)
                        n._callbacks[a]("succeed" == n._status ? null : n._status, n._bundle, n._params[a])
                }
                .bind(this),
                cc.assetManager.loadBundle(s, n._loadedCallback),
                n)
            },
            tick: function() {
                if (this._completeList.length > 0) {
                    for (var t = 0; t < this._completeList.length; ++t) {
                        var e = this._completeList[t];
                        if (null != e)
                            for (var i = 0; i < kloadItem._callbacks.length; ++i)
                                kloadItem._callbacks[i]("succeed" == e._status ? null : e._status, e._bundle, kloadItem._params[i])
                    }
                    this._completeList = []
                }
            },
            load: function(t, e) {
                cc.assetManager.loadRemote(t, function(t, i) {
                    e(t, i)
                }
                .bind(this))
            },
            loadRes: function(t, e, i) {
                return this.getBundle("client").load(t, e, i)
            },
            loadGameRes: function() {}
        },
        cc._RF.pop()
    }
    , {
        Bundle: "Bundle"
    }],
    SelectArea: [function(t, e) {
        "use strict";
        cc._RF.push(e, "fb6c5pLkuBNuKvFR3KfrGfW", "SelectArea"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.AreaSelectionNode = this.node.getChildByName("NodeAreaSelection"),
                this.ArenaSelectItem = this.AreaSelectionNode.getChildByName("AreaItem"),
                this.ArenaSelecContent = this.AreaSelectionNode.getChildByName("scrollview").getChildByName("view").getChildByName("content"),
                this.AreaSelectionNode.getChildByName("btn_Close").on(cc.Node.EventType.TOUCH_END, this.onclose, this),
                this.AreaSelectionNode.getChildByName("btn_confirm").on(cc.Node.EventType.TOUCH_END, function() {
                    this.onclose()
                }
                .bind(this))
            },
            show: function(t) {
                this.node.active = !0,
                this._callback = t,
                this._selectAreakey = null,
                this.freshAreaList()
            },
            onclose: function() {
                null != this._selectAreakey ? (this._callback(this._selectAreakey),
                this.node.active = !1) : yc.showNotice("\u8bf7\u5148\u9009\u62e9\u533a\u57df\uff01")
            },
            freshAreaList: function() {
                this.ArenaSelecContent.removeAllChildren();
                var t = yc.baseInfo.area_data;
                if (null != t)
                    for (var e = 0; e < t.length; e++) {
                        var i = cc.instantiate(this.ArenaSelectItem);
                        i.active = !0,
                        i.parent = this.ArenaSelecContent,
                        i._name = t[e].area_key,
                        i.getChildByName("label").getComponent(cc.Label).string = t[e].area_name;
                        var n = i.getComponent(cc.Toggle)
                          , s = new cc.Component.EventHandler;
                        s.target = this.node,
                        s.component = "SelectArea",
                        s.handler = "onToggleClicked",
                        s.customEventData = t[e].area_key,
                        n.clickEvents.push(s)
                    }
                else
                    cc.log("\u5730\u533a\u5217\u8868\u5f02\u5e38  SelectArea - ArenaList")
            },
            selectArea: function(t) {
                if (!(null == t || t.length <= 0)) {
                    this._selectAreakey = t;
                    for (var e = 0; e < this.ArenaSelecContent.childrenCount; ++e) {
                        var i = this.ArenaSelecContent.children[e];
                        i._name == t ? (i.getComponent(cc.Toggle).isChecked = !0,
                        i.getChildByName("label").color = new cc.color(74,128,52,255)) : (i.getComponent(cc.Toggle).isChecked = !1,
                        i.getChildByName("label").color = new cc.color(164,121,64,255))
                    }
                }
            },
            onToggleClicked: function(t, e) {
                this.selectArea(e)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    VersionCheckerUI: [function(t, e) {
        "use strict";
        cc._RF.push(e, "dfa79541mJDiJ7jqVeofzc6", "VersionCheckerUI"),
        cc.Class({
            extends: cc.Component,
            properties: {
                progress: cc.ProgressBar,
                title: cc.Label
            },
            onLoad: function() {},
            start: function() {},
            startUpdate: function(t) {
                this.title.string = t,
                this.progress.progress = 0
            },
            setProgress: function(t) {
                this.progress.progress = t
            },
            endUpdate: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    Version: [function(t, e) {
        "use strict";
        cc._RF.push(e, "ba3ccoOzv9ONaPCpV1eL50q", "Version"),
        yc.Version = {
            getBaseVersion: function() {
                return cc.sys.localStorage.getItem("BaseVersion")
            },
            getClientVersion: function() {
                return cc.sys.localStorage.getItem("ClientVersion")
            },
            setBaseVersion: function(t) {
                cc.sys.localStorage.setItem("BaseVersion", t)
            },
            setClientVersion: function(t) {
                cc.sys.localStorage.setItem("ClientVersion", t)
            },
            getGameVersion: function(t) {
                return cc.sys.localStorage.getItem("GameVersion_" + t)
            },
            setGameVersion: function(t, e) {
                cc.sys.localStorage.setItem("GameVersion_" + t, e)
            }
        },
        cc._RF.pop()
    }
    , {}],
    WebBaseImpl: [function(t, e) {
        "use strict";
        cc._RF.push(e, "a52afO0TTZGM40iTKG1MxmX", "WebBaseImpl");
        var i = cc.Class({
            ctor: function() {},
            init: function() {
                if (yc.baseFunction.isMWWeb()) {
                    var t = JSON.stringify({
                        screenOrientation: 0,
                        isFullScreen: !0
                    });
                    MostOneJSApis.setScreenConfig(t)
                }
            },
            versionCheck: function(t) {
                this._versionChecker = new yc.WebVersionChecker,
                this._versionChecker.checkVersion(t)
            },
            tick: function() {}
        });
        yc.WebBaseImpl = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    WebVersionChecker: [function(t, e) {
        "use strict";
        cc._RF.push(e, "004581Nab9J+qvMGQZsCXuL", "WebVersionChecker");
        var i = cc.Class({
            start: function() {},
            checkVersion: function(t) {
                t()
            }
        });
        yc.WebVersionChecker = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    YcObject: [function(t, e) {
        "use strict";
        cc._RF.push(e, "9ac02GTeGFPyaHxjEaimTiZ", "YcObject");
        var i = cc.Class({
            YcObject: function(t) {
                this._strName = t
            },
            getName: function() {
                return this._strName
            },
            init: function() {},
            tick: function() {},
            dispose: function() {}
        });
        yc.YcObject = e.exports = i,
        cc._RF.pop()
    }
    , {}],
    Yc: [function(t, e) {
        "use strict";
        cc._RF.push(e, "a69ae7N7olE0pkOfCabY89e", "Yc"),
        window.yc = {},
        t("YcObject"),
        t("BaseConfig"),
        t("Log"),
        t("Version"),
        cc._RF.pop()
    }
    , {
        BaseConfig: "BaseConfig",
        Log: "Log",
        Version: "Version",
        YcObject: "YcObject"
    }],
    md5: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b5d93VCTSBAXp9RVC0OpBhJ", "md5"),
        function() {
            function t(t, e) {
                var i = (65535 & t) + (65535 & e);
                return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i
            }
            function i(t, e) {
                return t << e | t >>> 32 - e
            }
            function n(e, n, s, o, a, c) {
                return t(i(t(t(n, e), t(o, c)), a), s)
            }
            function s(t, e, i, s, o, a, c) {
                return n(e & i | ~e & s, t, e, o, a, c)
            }
            function o(t, e, i, s, o, a, c) {
                return n(e & s | i & ~s, t, e, o, a, c)
            }
            function a(t, e, i, s, o, a, c) {
                return n(e ^ i ^ s, t, e, o, a, c)
            }
            function c(t, e, i, s, o, a, c) {
                return n(i ^ (e | ~s), t, e, o, a, c)
            }
            function r(e, i) {
                e[i >> 5] |= 128 << i % 32,
                e[14 + (i + 64 >>> 9 << 4)] = i;
                var n, r, l, u, h, d = 1732584193, f = -271733879, p = -1732584194, _ = 271733878;
                for (n = 0; n < e.length; n += 16)
                    r = d,
                    l = f,
                    u = p,
                    h = _,
                    f = c(f = c(f = c(f = c(f = a(f = a(f = a(f = a(f = o(f = o(f = o(f = o(f = s(f = s(f = s(f = s(f, p = s(p, _ = s(_, d = s(d, f, p, _, e[n], 7, -680876936), f, p, e[n + 1], 12, -389564586), d, f, e[n + 2], 17, 606105819), _, d, e[n + 3], 22, -1044525330), p = s(p, _ = s(_, d = s(d, f, p, _, e[n + 4], 7, -176418897), f, p, e[n + 5], 12, 1200080426), d, f, e[n + 6], 17, -1473231341), _, d, e[n + 7], 22, -45705983), p = s(p, _ = s(_, d = s(d, f, p, _, e[n + 8], 7, 1770035416), f, p, e[n + 9], 12, -1958414417), d, f, e[n + 10], 17, -42063), _, d, e[n + 11], 22, -1990404162), p = s(p, _ = s(_, d = s(d, f, p, _, e[n + 12], 7, 1804603682), f, p, e[n + 13], 12, -40341101), d, f, e[n + 14], 17, -1502002290), _, d, e[n + 15], 22, 1236535329), p = o(p, _ = o(_, d = o(d, f, p, _, e[n + 1], 5, -165796510), f, p, e[n + 6], 9, -1069501632), d, f, e[n + 11], 14, 643717713), _, d, e[n], 20, -373897302), p = o(p, _ = o(_, d = o(d, f, p, _, e[n + 5], 5, -701558691), f, p, e[n + 10], 9, 38016083), d, f, e[n + 15], 14, -660478335), _, d, e[n + 4], 20, -405537848), p = o(p, _ = o(_, d = o(d, f, p, _, e[n + 9], 5, 568446438), f, p, e[n + 14], 9, -1019803690), d, f, e[n + 3], 14, -187363961), _, d, e[n + 8], 20, 1163531501), p = o(p, _ = o(_, d = o(d, f, p, _, e[n + 13], 5, -1444681467), f, p, e[n + 2], 9, -51403784), d, f, e[n + 7], 14, 1735328473), _, d, e[n + 12], 20, -1926607734), p = a(p, _ = a(_, d = a(d, f, p, _, e[n + 5], 4, -378558), f, p, e[n + 8], 11, -2022574463), d, f, e[n + 11], 16, 1839030562), _, d, e[n + 14], 23, -35309556), p = a(p, _ = a(_, d = a(d, f, p, _, e[n + 1], 4, -1530992060), f, p, e[n + 4], 11, 1272893353), d, f, e[n + 7], 16, -155497632), _, d, e[n + 10], 23, -1094730640), p = a(p, _ = a(_, d = a(d, f, p, _, e[n + 13], 4, 681279174), f, p, e[n], 11, -358537222), d, f, e[n + 3], 16, -722521979), _, d, e[n + 6], 23, 76029189), p = a(p, _ = a(_, d = a(d, f, p, _, e[n + 9], 4, -640364487), f, p, e[n + 12], 11, -421815835), d, f, e[n + 15], 16, 530742520), _, d, e[n + 2], 23, -995338651), p = c(p, _ = c(_, d = c(d, f, p, _, e[n], 6, -198630844), f, p, e[n + 7], 10, 1126891415), d, f, e[n + 14], 15, -1416354905), _, d, e[n + 5], 21, -57434055), p = c(p, _ = c(_, d = c(d, f, p, _, e[n + 12], 6, 1700485571), f, p, e[n + 3], 10, -1894986606), d, f, e[n + 10], 15, -1051523), _, d, e[n + 1], 21, -2054922799), p = c(p, _ = c(_, d = c(d, f, p, _, e[n + 8], 6, 1873313359), f, p, e[n + 15], 10, -30611744), d, f, e[n + 6], 15, -1560198380), _, d, e[n + 13], 21, 1309151649), p = c(p, _ = c(_, d = c(d, f, p, _, e[n + 4], 6, -145523070), f, p, e[n + 11], 10, -1120210379), d, f, e[n + 2], 15, 718787259), _, d, e[n + 9], 21, -343485551),
                    d = t(d, r),
                    f = t(f, l),
                    p = t(p, u),
                    _ = t(_, h);
                return [d, f, p, _]
            }
            function l(t) {
                var e, i = "", n = 32 * t.length;
                for (e = 0; e < n; e += 8)
                    i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
                return i
            }
            function u(t) {
                var e, i = [];
                for (i[(t.length >> 2) - 1] = void 0,
                e = 0; e < i.length; e += 1)
                    i[e] = 0;
                var n = 8 * t.length;
                for (e = 0; e < n; e += 8)
                    i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
                return i
            }
            function h(t) {
                return l(r(u(t), 8 * t.length))
            }
            function d(t, e) {
                var i, n, s = u(t), o = [], a = [];
                for (o[15] = a[15] = void 0,
                s.length > 16 && (s = r(s, 8 * t.length)),
                i = 0; i < 16; i += 1)
                    o[i] = 909522486 ^ s[i],
                    a[i] = 1549556828 ^ s[i];
                return n = r(o.concat(u(e)), 512 + 8 * e.length),
                l(r(a.concat(n), 640))
            }
            function f(t) {
                var e, i, n = "";
                for (i = 0; i < t.length; i += 1)
                    e = t.charCodeAt(i),
                    n += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
                return n
            }
            function p(t) {
                return unescape(encodeURIComponent(t))
            }
            function _(t) {
                return h(p(t))
            }
            function g(t) {
                return f(_(t))
            }
            function m(t, e) {
                return d(p(t), p(e))
            }
            function C(t, e) {
                return f(m(t, e))
            }
            function b(t, e, i) {
                return e ? i ? m(e, t) : C(e, t) : i ? _(t) : g(t)
            }
            "function" == typeof define && define.amd ? define(function() {
                return b
            }) : "object" == typeof e && e.exports ? e.exports = b : (void 0).md5 = b
        }(),
        cc._RF.pop()
    }
    , {}]
}, {}, ["Base", "BaseConfig", "BaseDefine", "BaseFunction", "Launcher", "Yc", "YcObject", "Log", "BasePlatform", "BasePlatformLogic", "AndroidUpdateBase", "AppBaseImpl", "AppDownloader", "AppUpdateTool", "AppVersionChecker", "AppZip", "BasePlatformAndroid", "BasePlatformAndroidLogic", "BasePlatformIos", "BasePlatformIosLogic", "BasePlatformWindows", "BasePlatformWindowsLogic", "ClientUpdate", "BasePlatformWeb", "BasePlatformWebLogic", "WebBaseImpl", "WebVersionChecker", "Bundle", "BundlePath", "Resource", "CharMapping", "Http", "md5", "BaseMessageBox", "BaseNotice", "BaseWaiting", "CommonUI", "SelectArea", "VersionCheckerUI", "Version"]);
