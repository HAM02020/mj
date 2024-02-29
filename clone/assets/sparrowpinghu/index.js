window.__require = function e(t, a, i) {
    function r(n, s) {
        if (!a[n]) {
            if (!t[n]) {
                var _ = n.split("/");
                if (_ = _[_.length - 1],
                !t[_]) {
                    var d = "function" == typeof __require && __require;
                    if (!s && d)
                        return d(_, !0);
                    if (o)
                        return o(_, !0);
                    throw new Error("Cannot find module '" + n + "'")
                }
                n = _
            }
            var c = a[n] = {
                exports: {}
            };
            t[n][0].call(c.exports, function(e) {
                return r(t[n][1][e] || e)
            }, c, c.exports, e, t, a, i)
        }
        return a[n].exports
    }
    for (var o = "function" == typeof __require && __require, n = 0; n < i.length; n++)
        r(i[n]);
    return r
}({
    sparrowpinghuCMD: [function(e, t) {
        "use strict";
        cc._RF.push(t, "b5ca774OzNP8Izwma8NuK+8", "sparrowpinghuCMD");
        var a = e("GameNetMessage")
          , i = {
            MAX_COUNT: 14,
            MAX_INDEX: 34,
            MAX_REPERTORY: 120,
            MAX_REPERTORY_SHORTCARD: 112,
            MASK_COLOR: 240,
            MASK_VALUE: 15,
            setRoomConfig: function(e) {
                10802 == e ? (i.MY_VIEWID = 1,
                i.GAME_PLAYER = 2) : 10803 == e ? (i.MY_VIEWID = 1,
                i.GAME_PLAYER = 3) : 10801 == e && (i.MY_VIEWID = 2,
                i.GAME_PLAYER = 4)
            },
            GAME_PLAYER: 4,
            MY_VIEWID: 2,
            DIRECTION_NORTH: 0,
            DIRECTION_WEST: 1,
            DIRECTION_SOUTH: 2,
            DIRECTION_EAST: 3,
            MJNAME_LUJING: "sparrowpinghu/res/sy_hrmj"
        };
        i.GameStatus = cc.Enum({
            GAME_SCENE_FREE: 0,
            GAME_SCENE_PU_FEN: 11,
            GAME_SCENE_PLAY: 100
        }),
        i.GameMessage_S_CMD = cc.Enum({
            SUB_S_GAME_START: 100,
            SUB_S_OUT_CARD: 101,
            SUB_S_SEND_CARD: 102,
            SUB_S_OPERATE_NOTIFY: 103,
            SUB_S_OPERATE_RESULT: 104,
            SUB_S_LISTEN_CARD: 105,
            SUB_S_GAME_CONCLUDE: 108,
            SUB_S_HU_CARD: 110,
            SUB_S_REFRESH_WEAVECARD: 115,
            SUB_S_AUTO_CARD_RESULT: 116,
            SUB_S_TING_CARD: 117,
            SUS_S_UPDATE_USER_SCORE: 118,
            SUB_S_STAER_PU_FEN: 119,
            SUB_S_STAER_PU_FEN_RESULT: 120,
            SUB_S_SHOW_DELAY_TIME: 121,
            SUB_S_SEND_TIME_AUTOS_TART: 128
        });
        var r = cc.Enum({
            SUB_C_OUT_CARD: 1,
            SUB_C_OPERATE_CARD: 2,
            SUB_C_AUTO_CARD: 4,
            SUB_C_JIA_PU: 12,
            SUB_C_LISTEN_CARD: 3
        })
          , o = cc.Class({
            extends: a,
            ctor: function() {
                this._lGameScore = new Array,
                this._dwTeaHouseID = 0,
                this._dwTeaHouseLeaderID = 0,
                this._bGameStarted = 0,
                this._bisRusultState = 0,
                this._wMaxRoundCount = 0,
                this._wCurrentRound = 0,
                this._wCurrentRealRound = 0,
                this._wFirstBankerUser = 0
            },
            DeserializationData: function(e) {
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._lGameScore[t] = e.popInt();
                this._dwTeaHouseID = e.popDword(),
                this._dwTeaHouseLeaderID = e.popDword(),
                this._bGameStarted = e.popBool(),
                this._bisRusultState = e.popBool(),
                this._wMaxRoundCount = e.popWord(),
                this._wCurrentRound = e.popWord(),
                this._wCurrentRealRound = e.popWord(),
                this._wFirstBankerUser = e.popWord()
            }
        })
          , n = cc.Class({
            extends: a,
            ctor: function() {
                this._lGameScore = new Array,
                this._dwTeaHouseID = 0,
                this._dwTeaHouseLeaderID = 0,
                this._bGameStarted = 0,
                this._bisRusultState = 0,
                this._wMaxRoundCount = 0,
                this._wCurrentRound = 0,
                this._wCurrentRealRound = 0,
                this._wFirstBankerUser = 0,
                this._pufentimer = 0,
                this._cbPuFenRecord = new Array,
                this._cbCanPuFen = 0
            },
            DeserializationData: function(e) {
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._lGameScore[t] = e.popInt();
                for (this._dwTeaHouseID = e.popDword(),
                this._dwTeaHouseLeaderID = e.popDword(),
                this._bGameStarted = e.popBool(),
                this._bisRusultState = e.popBool(),
                this._wMaxRoundCount = e.popWord(),
                this._wCurrentRound = e.popWord(),
                this._wCurrentRealRound = e.popWord(),
                this._wFirstBankerUser = e.popWord(),
                this._pufentimer = e.popInt(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._cbPuFenRecord[t] = e.popInt();
                this._cbCanPuFen = e.popByte()
            }
        })
          , s = cc.Class({
            extends: a,
            ctor: function() {
                this._lGameScore = new Array,
                this._wFirstBankerUser = 0,
                this._wBankerUser = 0,
                this._wCurrentUser = 0,
                this._cbActionCard = 0,
                this._cbActionMask = 0,
                this._cbLeftCardCount = 0,
                this._bTing = new Array,
                this._wOutCardUser = 0,
                this._cbOutCardData = 0,
                this._cbDiscardCount = new Array,
                this._cbDiscardCard = new Array,
                this._cbCardCount = new Array,
                this._cbCardData = new Array,
                this._cbSendCardData = 0,
                this._cbWeaveItemCount = new Array,
                this._oWeaveItemArray = new Array,
                this._bWillListen = 0,
                this._dwTeaHouseID = 0,
                this._dwTeaHouseLeaderID = 0,
                this._wMaxRoundCount = 0,
                this._wCurrentRound = 0,
                this._wCurrentRealRound = 0,
                this._bisAutoCard = !1,
                this._m_NoCanGang = new Array,
                this._lJiaPu = new Array
            },
            DeserializationData: function(e) {
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._lGameScore[t] = e.popInt();
                for (this._wFirstBankerUser = e.popWord(),
                this._wBankerUser = e.popWord(),
                this._wCurrentUser = e.popWord(),
                this._cbActionCard = e.popByte(),
                this._cbActionMask = e.popDword(),
                this._cbLeftCardCount = e.popByte(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._bTing[t] = e.popBool();
                for (this._wOutCardUser = e.popWord(),
                this._cbOutCardData = e.popByte(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._cbDiscardCount[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++) {
                    this._cbDiscardCard[t] = new Array;
                    for (var a = 0; a < 60; a++)
                        this._cbDiscardCard[t][a] = e.popByte()
                }
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbCardCount[t] = e.popByte();
                for (t = 0; t < i.MAX_COUNT; t++)
                    this._cbCardData[t] = e.popByte();
                for (this._cbSendCardData = e.popByte(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._cbWeaveItemCount[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    for (this._oWeaveItemArray[t] = new Array,
                    a = 0; a < 4; a++) {
                        this._oWeaveItemArray[t][a] = {},
                        this._oWeaveItemArray[t][a].cbWeaveKind = e.popByte(),
                        this._oWeaveItemArray[t][a].cbCenterCard = e.popByte(),
                        this._oWeaveItemArray[t][a].cbPublicCard = e.popByte(),
                        this._oWeaveItemArray[t][a].cbParam = e.popByte(),
                        this._oWeaveItemArray[t][a].wProvideUser = e.popWord(),
                        this._oWeaveItemArray[t][a].cbCardData = new Array;
                        for (var r = 0; r < 4; r++)
                            this._oWeaveItemArray[t][a].cbCardData[r] = e.popByte()
                    }
                for (this._bWillListen = e.popBool(),
                this._dwTeaHouseID = e.popDword(),
                this._dwTeaHouseLeaderID = e.popDword(),
                this._wMaxRoundCount = e.popWord(),
                this._wCurrentRound = e.popWord(),
                this._wCurrentRealRound = e.popWord(),
                this._bisAutoCard = e.popBool(),
                t = 0; t < 4; t++)
                    this._m_NoCanGang[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._lJiaPu[t] = e.popInt()
            }
        })
          , _ = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUS_S_UPDATE_USER_SCORE,
                this._lScore = new Array
            },
            DeserializationData: function(e) {
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._lScore[t] = e.popInt()
            }
        })
          , d = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_STAER_PU_FEN,
                this._cbCanPuFen = 0
            },
            DeserializationData: function(e) {
                this._cbCanPuFen = e.popByte()
            }
        })
          , c = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_STAER_PU_FEN_RESULT,
                this._wChairID = 0,
                this._cbPuFenRecord = 0,
                this._bStartGame = !1
            },
            DeserializationData: function(e) {
                this._wChairID = e.popWord(),
                this._cbPuFenRecord = e.popByte(),
                this._bStartGame = e.popBool()
            }
        })
          , h = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_GAME_START,
                this._wBankerUser = 0,
                this._wFirstBankerUser = 0,
                this._cbUserAction = 0,
                this._cbCardData = [],
                this._wMaxRoundCount = 0,
                this._wCurrentRound = 0,
                this._wCurrentRealRound = 0
            },
            DeserializationData: function(e) {
                this._wBankerUser = e.popWord(),
                this._wFirstBankerUser = e.popWord(),
                this._cbUserAction = e.popDword();
                for (var t = 0; t < i.MAX_COUNT; ++t)
                    this._cbCardData.push(e.popByte());
                this._wMaxRoundCount = e.popWord(),
                this._wCurrentRound = e.popWord(),
                this._wCurrentRealRound = e.popWord()
            }
        })
          , C = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_OUT_CARD,
                this._wOutCardUser = 0,
                this._cbOutCardData = 0,
                this._bTing = new Array
            },
            DeserializationData: function(e) {
                this._wOutCardUser = e.popWord(),
                this._cbOutCardData = e.popByte();
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._bTing[t] = e.popBool()
            }
        })
          , u = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_SEND_CARD,
                this._cbCardData = 0,
                this._wActionMask = 0,
                this._wSendCardUser = 0,
                this._bTail = !1,
                this._bFinalCard = !1
            },
            DeserializationData: function(e) {
                this._cbCardData = e.popByte(),
                this._wActionMask = e.popDword(),
                this._wSendCardUser = e.popWord(),
                this._bTail = e.popBool(),
                this._bFinalCard = e.popBool()
            }
        })
          , l = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_OPERATE_NOTIFY,
                this._wActionMask = 0,
                this._cbActionCard = 0
            },
            DeserializationData: function(e) {
                this._wActionMask = e.popDword(),
                this._cbActionCard = e.popByte()
            }
        })
          , g = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_OPERATE_RESULT,
                this._wOperateUser = 0,
                this._wProvideUser = 0,
                this._wOperateCode = 0,
                this._cbOperateParam = 0,
                this._cbOperateCard = new Array,
                this._cbOperateCardCount = 0,
                this._m_NoCanGang = new Array
            },
            DeserializationData: function(e) {
                this._wOperateUser = e.popWord(),
                this._wProvideUser = e.popWord(),
                this._wOperateCode = e.popDword(),
                this._cbOperateParam = e.popByte();
                for (var t = 0; t < 4; t++)
                    this._cbOperateCard[t] = e.popByte();
                for (this._cbOperateCardCount = e.popByte(),
                t = 0; t < 4; t++)
                    this._m_NoCanGang[t] = e.popByte()
            }
        })
          , p = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_LISTEN_CARD,
                this._wListenUser,
                this._bListen,
                this._bAutoCard
            },
            DeserializationData: function(e) {
                this._wListenUser = e.popWord(),
                this._bListen = e.popBool(),
                this._bAutoCard = e.popBool()
            }
        })
          , m = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_REFRESH_WEAVECARD,
                this._wProvideUser = 0,
                this._cbWeaveCard = 0
            },
            DeserializationData: function(e) {
                this._wProvideUser = e.popWord(),
                this._cbWeaveCard = e.popByte()
            }
        })
          , I = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_AUTO_CARD_RESULT,
                this._bIsAutoCard = !1
            },
            DeserializationData: function(e) {
                this._bIsAutoCard = e.popBool()
            }
        })
          , f = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_TING_CARD,
                this._cbOutCardCount = 0,
                this._cbOutCardData = new Array,
                this._cbHuCardCount = new Array,
                this._cbHuCardData = new Array,
                this._cbHuCardRemainingCount = new Array,
                this._cbHuCardFanCount = new Array,
                this._dwChiHuRight = new Array,
                this._bShow = !1,
                this._bTouth = !1
            },
            DeserializationData: function(e) {
                this._cbOutCardCount = e.popByte();
                for (var t = 0; t < i.MAX_COUNT; t++)
                    this._cbOutCardData[t] = e.popByte();
                for (t = 0; t < i.MAX_COUNT; t++)
                    this._cbHuCardCount[t] = e.popByte();
                for (t = 0; t < i.MAX_COUNT; t++) {
                    this._cbHuCardData[t] = new Array;
                    for (var a = 0; a < i.MAX_INDEX; a++)
                        this._cbHuCardData[t][a] = e.popByte()
                }
                for (t = 0; t < i.MAX_COUNT; t++)
                    for (this._cbHuCardRemainingCount[t] = new Array,
                    a = 0; a < i.MAX_INDEX; a++)
                        this._cbHuCardRemainingCount[t][a] = e.popByte();
                for (t = 0; t < i.MAX_COUNT; t++)
                    for (this._cbHuCardFanCount[t] = new Array,
                    a = 0; a < i.MAX_INDEX; a++)
                        this._cbHuCardFanCount[t][a] = e.popByte();
                for (t = 0; t < i.MAX_COUNT; t++)
                    for (this._dwChiHuRight[t] = new Array,
                    a = 0; a < i.MAX_INDEX; a++)
                        this._dwChiHuRight[t][a] = e.popDword();
                this._bShow = e.popBool(),
                this._bTouth = e.popBool()
            }
        })
          , w = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_HU_CARD,
                this._cbHuCardCount,
                this._cbHuCardData = new Array,
                this._cbHuCardRemainingCount = new Array,
                this._cbHuCardFanCount = new Array,
                this._dwChiHuRight = new Array
            },
            DeserializationData: function(e) {
                this._cbHuCardCount = e.popByte();
                for (var t = 0; t < i.MAX_INDEX; t++)
                    this._cbHuCardData[t] = e.popByte();
                for (t = 0; t < i.MAX_INDEX; t++)
                    this._cbHuCardRemainingCount[t] = e.popByte();
                for (t = 0; t < i.MAX_INDEX; t++)
                    this._cbHuCardFanCount[t] = e.popByte();
                for (t = 0; t < i.MAX_INDEX; t++)
                    this._dwChiHuRight[t] = e.popDword()
            }
        })
          , A = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_SHOW_DELAY_TIME,
                this._bShow = !1,
                this._wChairID = 0,
                this._wDelayDissoveTime = new Array,
                this._wTotalDelayDissoveTime = new Array,
                this._wTotalOfflineDissoveTime = new Array
            },
            DeserializationData: function(e) {
                this._bShow = e.popBool(),
                this._wChairID = e.popWord();
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._wDelayDissoveTime[t] = e.popWord();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._wTotalDelayDissoveTime[t] = e.popWord();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._wTotalOfflineDissoveTime[t] = e.popWord()
            }
        })
          , E = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_GAME_CONCLUDE,
                this._lCellScore = 0,
                this._lGameScore = new Array,
                this._lTotalScore = new Array,
                this._lRevenue = new Array,
                this._dGangFan = new Array,
                this._lGangScore = new Array,
                this._wBankerUser = 0,
                this._wProvideUser = 0,
                this._cbProvideCard = 0,
                this._cbSendCardData = 0,
                this._dwChiHuKind = new Array,
                this._dwChiHuRight = new Array,
                this._cbCardCount = new Array,
                this._cbHandCardData = new Array,
                this._bWeaveParam = new Array,
                this._bNaturalConclude = !1,
                this._bisAgainSendGameEnd = !1,
                this._bIsBigResult = !1,
                this._cbWeaveItemCount = new Array,
                this._WeaveItemArray = new Array,
                this._bOpen = new Array,
                this._wMaxRoundCount = 0,
                this._wCurrentRound = 0,
                this._cbminggang = new Array,
                this._cbangang = new Array,
                this._cbDianGangConut = new Array,
                this.cb_bDianGang = new Array,
                this.cb_bMoGang = new Array,
                this.cb_bAnGang = new Array,
                this.cb_liangxinum = new Array,
                this.cbPuFen = new Array,
                this._bTing = new Array
            },
            DeserializationData: function(e) {
                this._lCellScore = e.popInt();
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._lGameScore[t] = e.popLong();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._lTotalScore[t] = e.popInt();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._lRevenue[t] = e.popLong();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._dGangFan[t] = e.popDword();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._lGangScore[t] = e.popLong();
                for (this._wBankerUser = e.popWord(),
                this._wProvideUser = e.popWord(),
                this._cbProvideCard = e.popByte(),
                this._cbSendCardData = e.popByte(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._dwChiHuKind[t] = e.popDword();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._dwChiHuRight[t] = e.popDword();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbCardCount[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++) {
                    this._cbHandCardData[t] = new Array;
                    for (var a = 0; a < i.MAX_COUNT; a++)
                        this._cbHandCardData[t][a] = e.popByte()
                }
                for (t = 0; t < i.GAME_PLAYER; t++)
                    for (this._bWeaveParam[t] = new Array,
                    a = 0; a < 4; a++)
                        this._bWeaveParam[t][a] = e.popByte();
                for (this._bNaturalConclude = e.popBool(),
                this._bisAgainSendGameEnd = e.popBool(),
                this._bIsBigResult = e.popBool(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._cbWeaveItemCount[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    for (this._WeaveItemArray[t] = new Array,
                    a = 0; a < 4; a++) {
                        this._WeaveItemArray[t][a] = {},
                        this._WeaveItemArray[t][a].cbWeaveKind = e.popByte(),
                        this._WeaveItemArray[t][a].cbCenterCard = e.popByte(),
                        this._WeaveItemArray[t][a].cbPublicCard = e.popByte(),
                        this._WeaveItemArray[t][a].cbParam = e.popByte(),
                        this._WeaveItemArray[t][a].wProvideUser = e.popWord(),
                        this._WeaveItemArray[t][a].cbCardData = new Array;
                        for (var r = 0; r < 4; r++)
                            this._WeaveItemArray[t][a].cbCardData[r] = e.popByte()
                    }
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._bOpen[t] = e.popBool();
                for (this._wMaxRoundCount = e.popWord(),
                this._wCurrentRound = e.popWord(),
                t = 0; t < i.GAME_PLAYER; t++)
                    this._cbminggang[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbangang[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbDianGangConut[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this.cb_bDianGang[t] = e.popBool();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this.cb_bMoGang[t] = e.popBool();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this.cb_bAnGang[t] = e.popBool();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this.cb_liangxinum[t] = e.popInt();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this.cbPuFen[t] = e.popInt();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._bTing[t] = e.popBool()
            }
        })
          , D = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_LISTEN_CARD,
                this._cbZiMoNum = new Array,
                this._cbJiePaoNum = new Array,
                this._cbDianPaoNum = new Array,
                this._lTotalScore = new Array
            },
            DeserializationData: function(e) {
                for (var t = 0; t < i.GAME_PLAYER; t++)
                    this._cbZiMoNum[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbJiePaoNum[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._cbDianPaoNum[t] = e.popByte();
                for (t = 0; t < i.GAME_PLAYER; t++)
                    this._lTotalScore[t] = e.popInt()
            }
        })
          , S = cc.Class({
            extends: a,
            ctor: function() {
                this._cbCardData = 0
            },
            SerializationData: function() {
                this.psubCmd = r.SUB_C_OUT_CARD,
                this._streamData.pushByte(this._cbCardData)
            }
        })
          , v = cc.Class({
            extends: a,
            ctor: function() {
                this._cbOperateCode = 0,
                this._cbOperateCard = new Array
            },
            SerializationData: function() {
                this.psubCmd = r.SUB_C_OPERATE_CARD,
                this._streamData.pushDword(this._cbOperateCode);
                for (var e = 0; e < 3; e++)
                    this._streamData.pushByte(this._cbOperateCard[e])
            }
        })
          , R = cc.Class({
            extends: a,
            ctor: function() {
                this._bIsAutoCard = !1
            },
            SerializationData: function() {
                this.psubCmd = r.SUB_C_AUTO_CARD,
                this._streamData.pushBool(this._bIsAutoCard)
            }
        })
          , G = cc.Class({
            extends: a,
            ctor: function() {
                this._lUserJiaPu = 0
            },
            SerializationData: function() {
                this.psubCmd = r.SUB_C_JIA_PU,
                this._streamData.pushByte(this._lUserJiaPu)
            }
        })
          , N = cc.Class({
            extends: a,
            ctor: function() {
                this.psubCmd = i.GameMessage_S_CMD.SUB_S_SEND_TIME_AUTOS_TART,
                this._cbAutoStartTime = 10
            },
            DeserializationData: function(e) {
                this._cbAutoStartTime = e.popByte()
            }
        })
          , M = cc.Class({
            extends: a,
            ctor: function() {
                this._bListenCard = !1
            },
            SerializationData: function() {
                this.psubCmd = r.SUB_C_LISTEN_CARD,
                this._streamData.pushBool(this._bListenCard)
            }
        });
        i.GNet_S_Message = {
            GNet_S_StartPuFen: d,
            GNet_S_StartPuFenResult: c,
            GNet_S_GameStart: h,
            GNet_S_GameOutCard: C,
            GNet_S_GameSendCard: u,
            GNet_S_OperateNotify: l,
            GNet_S_OperateResult: g,
            GNet_S_ListenCard: p,
            GNet_S_Ting_Data: f,
            GNet_S_Hu_Data: w,
            GNET_S_RefreshWeaveCard: m,
            GNET_S_AutoCardResult: I,
            GNet_S_GameConclude: E,
            GNet_S_BigGameConclude: D,
            GNet_S_GameSceneFree: o,
            GNet_S_GameSceneJiaPu: n,
            GNet_S_GameScenePlay: s,
            GNet_S_UpdateUserScore: _,
            GNET_S_ShowDelayTime: A,
            CMD_S_AutoStartData: N
        },
        i.GNet_C_Message = {
            GNet_C_OutCard: S,
            GNet_C_OperateCard: v,
            GNet_C_AutoCard: R,
            GNet_C_UserJiaPu: G,
            GNet_C_ListenCard: M
        },
        t.exports = i,
        cc._RF.pop()
    }
    , {
        GameNetMessage: void 0
    }],
    sparrowpinghuCardNode: [function(e, t) {
        "use strict";
        cc._RF.push(t, "31c82KoICdO749FOzqZXfDs", "sparrowpinghuCardNode");
        var a = e("ResBase");
        cc.Class({
            extends: a,
            properties: {},
            onLoad: function() {
                this._nCardData = 0,
                this._nCardState = 0,
                this._nCardIndex = 0
            },
            start: function() {},
            setCardIndex: function(e) {
                this._nCardIndex = e
            },
            getCardIndex: function() {
                return this._nCardIndex
            },
            setCardTouchState: function(e) {
                this._nCardState = e
            },
            getCardTouchState: function() {
                return this._nCardState
            },
            setCardData: function(e) {
                this._nCardData = e
            },
            getCardData: function() {
                return this._nCardData
            },
            resetData: function() {
                this._nCardData = 0,
                this._nCardState = 0
            }
        }),
        cc._RF.pop()
    }
    , {
        ResBase: void 0
    }],
    sparrowpinghuCard: [function(e, t) {
        "use strict";
        cc._RF.push(t, "511f5zxsjlIB5LcYKZYHcRi", "sparrowpinghuCard");
        var a = e("sparrowpinghuCMD")
          , i = e("sparrowpinghuCardNode")
          , r = e("ResBase")
          , o = e("GlobalDefine")
          , n = e("GlobalFunction")
          , s = e("sparrowpinghuGameLogic")
          , _ = e("sparrowpinghuCreateCard")
          , d = e("sparrowpinghuGameConfig").cardConfig
          , c = a
          , h = new Array;
        h[c.DIRECTION_NORTH] = cc.v2(258, 243.75),
        h[c.DIRECTION_WEST] = cc.v2(-406, 251.5),
        h[c.DIRECTION_SOUTH] = cc.v2(-263, -207.5),
        h[c.DIRECTION_EAST] = cc.v2(406, -196.5);
        var C = new Array;
        C[c.DIRECTION_NORTH] = cc.v2(-250, 350),
        C[c.DIRECTION_WEST] = cc.v2(-500, -100),
        C[c.DIRECTION_SOUTH] = cc.v2(315, -355),
        C[c.DIRECTION_EAST] = cc.v2(505, 200);
        var u = new Array;
        u[c.DIRECTION_NORTH] = cc.v2(595, 500),
        u[c.DIRECTION_WEST] = cc.v2(200, 300),
        u[c.DIRECTION_SOUTH] = cc.v2(595, 150),
        u[c.DIRECTION_EAST] = cc.v2(900, 300),
        cc.Class({
            extends: r,
            properties: {},
            onLoad: function() {
                cc.log("cardLayer onLoad"),
                this._bRunActMoveHandCard = null,
                this._oGameView = null,
                this._CardBackAtlas = null,
                this._CardFontAtlas = null,
                this._oHandCardNode = new Array,
                this._oDisCardNode = new Array,
                this._oDisCard = new Array,
                this._oWeaCardNode = new Array,
                this._oWeaCard = new Array,
                this._oGameEndHandCardNode = new Array,
                this._oPublicCardNode = new Array,
                this._outCardActionState = new Array,
                this._nPLActionState = new Array,
                this._nCardEnlargeActionState = new Array,
                this._oCreateCard = this.getComponent(_),
                this._oCreateCard || (this._oCreateCard = this.addComponent(_))
            },
            start: function() {},
            setGameView: function(e) {
                this._oGameView = e
            },
            setCardFontAtlas: function(e) {
                e || cc.error("setCardFontAtlas Atlas_ == null"),
                this._CardBackAtlas = e,
                this._oCreateCard.setCardFontAtlas(e)
            },
            setCardBackAtlas: function(e) {
                e || cc.error("setCardBackAtlas Atlas_ == null"),
                this._CardFontAtlas = e,
                this._oCreateCard.setCardBackAtlas(e)
            },
            init: function() {
                d.setCardFontSize(this._oGameView._gameMode.getGameSetValue(o.GameOptionString.CARD_FONT_SIZE)),
                d.setCardBackColor(this._oGameView._gameMode.getGameSetValue(o.GameOptionString.GAME_CARD_BACK)),
                this._bRunActMoveHandCard = !1;
                for (var e = 0; e < c.GAME_PLAYER; e++)
                    this._oWeaCardNode[e] = this.createWeaCard(e),
                    this._oWeaCard[e] = new Array,
                    this._oGameEndHandCardNode[e] = this.createGameEndHandCard(e),
                    this._oDisCardNode[e] = this.createDisCard(e),
                    this._oDisCard[e] = new Array,
                    this._nPLActionState[e] = new Array;
                for (e = 0; e < c.GAME_PLAYER; e++)
                    this._oHandCardNode[e] = this.createHandCard(e);
                for (e = 0; e < c.GAME_PLAYER; e++)
                    this._oPublicCardNode[e] = this.createPublicCard(e),
                    this._outCardActionState[e] = 3;
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this),
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this),
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this),
                this.initScreenFit()
            },
            initScreenFit: function() {
                cc.winSize.width <= 1334 && (this._oHandCardNode[c.MY_VIEWID].scale = n.switchToFitScale(1),
                this._oHandCardNode[c.MY_VIEWID].setPosition(n.switchToFitPostion(d.getHandCardNodePos(c.DIRECTION_SOUTH))),
                this._oWeaCardNode[c.MY_VIEWID].scale = n.switchToFitScale(1),
                this._oWeaCardNode[c.MY_VIEWID].setPosition(n.switchToFitPostion(d.getWeaveCardNodePos(c.DIRECTION_SOUTH))),
                this._oGameEndHandCardNode[c.MY_VIEWID].scale = n.switchToFitScale(1),
                this._oGameEndHandCardNode[c.MY_VIEWID].setPosition(n.switchToFitPostion(C[c.DIRECTION_SOUTH])))
            },
            createHandCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("createHandCard() error nViewID_[%d]", e),
                    !1;
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = new cc.Node
                  , r = d.getHandCardConfig(t);
                a.setPosition(d.getHandCardNodePos(t)),
                this.node.addChild(a);
                for (var o = 0; o < c.MAX_COUNT; o++) {
                    var _ = this._oCreateCard.createHandCardSpr(t, null);
                    _.addComponent(i),
                    a.addChild(_),
                    _.active = !1,
                    _.getComponent(i).setCardIndex(o),
                    _.name = "handCard_" + e + "_index_" + o,
                    t == c.DIRECTION_NORTH ? 0 == o ? _.setPosition(o * (_.width + r.posOffsetX) - r.sendCardSpace, 0) : _.setPosition(o * (_.width + r.posOffsetX), 0) : t == c.DIRECTION_WEST ? (0 == o ? _.setPosition(0, o * (_.height + r.posOffsetY) - r.sendCardSpace) : _.setPosition(0, o * (_.height + r.posOffsetY)),
                    _.zIndex = 1e3 - o) : t == c.DIRECTION_SOUTH ? (0 == o ? _.setPosition(-o * (_.width + r.posOffsetX) + r.sendCardSpace, 0) : _.setPosition(-o * (_.width + r.posOffsetX), 0),
                    _.getComponent(i).setCardTouchState(0)) : t == c.DIRECTION_EAST && (0 == o ? _.setPosition(0, -o * (_.height + r.posOffsetY) + r.sendCardSpace) : _.setPosition(0, -o * (_.height + r.posOffsetY)))
                }
                return a
            },
            createPublicCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("createHandCard() error nViewID_[%d]", e),
                    !1;
                var t = new cc.Node;
                t.setPosition(-640, -360),
                this.node.addChild(t);
                var a = this._oCreateCard.createHandCardSpr(c.DIRECTION_SOUTH, null);
                return a.addComponent(i),
                a.scale = 1.2,
                a.active = !1,
                a.name = "outCard",
                t.addChild(a),
                t
            },
            createDisCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("createDisCard() error nViewID_[%d]", e),
                    !1;
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = new cc.Node;
                return 2 == c.GAME_PLAYER ? t == c.DIRECTION_NORTH ? a.setPosition(h[t].x + 255, h[t].y) : t == c.DIRECTION_SOUTH && a.setPosition(h[t].x - 255, h[t].y) : a.setPosition(h[t]),
                this.node.addChild(a),
                a
            },
            createWeaCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("createWeaCard() error nViewID_[%d]", e),
                    !1;
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = new cc.Node;
                return a.setPosition(d.getWeaveCardNodePos(t)),
                t == c.DIRECTION_NORTH ? a._anchorPoint = cc.v2(1, 1) : t == c.DIRECTION_WEST ? a._anchorPoint = cc.v2(0, 1) : t == c.DIRECTION_SOUTH ? a._anchorPoint = cc.v2(0, 0) : t == c.DIRECTION_EAST && (a._anchorPoint = cc.v2(1, 0)),
                this.node.addChild(a),
                a
            },
            setHandCard: function(e, t, a) {
                if (0 == s.isValidViewId(e))
                    return cc.error("setHandCard() error nViewID_[%d]", e),
                    !1;
                var r = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , _ = d.getHandCardConfig(r)
                  , h = this.convetWeavePosToHandPos(e, this.getWeaCardEndPos(e));
                e == c.MY_VIEWID && this.rectifyControl();
                var C = s.copyArray(this._oHandCardNode[e].children);
                C.sort(this.cardCompare);
                var u = this._oHandCardNode[e].childrenCount
                  , l = o.INVALID_CHAIR;
                this._oGameView._gameMode._nCurrentUser != o.INVALID_CHAIR && (l = n.switchViewChairID(c.GAME_PLAYER, this._oGameView._gameMode.getMeChairId(), this._oGameView._gameMode._nCurrentUser));
                for (var g = 0; g < u; g++)
                    C[g].active = !1,
                    C[g].getComponent(i).setCardData(0);
                for (g = 0; g < a; g++) {
                    var p = a - 1 - g;
                    if (l != e && (p = a - g),
                    p < 0 || p >= c.MAX_COUNT)
                        cc.log("\u975e\u6cd5index[%d]", p);
                    else {
                        if (C[p].active = !0,
                        e == c.MY_VIEWID && t && 1 == s.isValidCard(t[g])) {
                            C[p].getComponent(i).setCardData(t[g]);
                            var m = C[p].getChildByName("CardFont");
                            null != m && C[p].removeChild(m),
                            (m = this._oCreateCard.createHandCardFont(t[g])).setPosition(C[p].width / 2, C[p].height / 2 - 10),
                            m.name = "CardFont",
                            m.setScale(_.fontScale),
                            C[p].addChild(m)
                        }
                        C[p].width = _.size.width,
                        C[p].height = _.size.height,
                        r == c.DIRECTION_NORTH ? C[p].x = 0 == p ? h.x - (g * (C[p].width + _.posOffsetX) + _.weaveSpace + _.sendCardSpace) : h.x - (g * (C[p].width + _.posOffsetX) + _.weaveSpace) : r == c.DIRECTION_SOUTH && (window.YC.Player.PlatformID == o.PlatformDefine.PD_MOWANG ? C[p].x = 0 == p ? h.x + g * (C[p].width + _.posOffsetX) + (this._oWeaCard[e].length > 0 ? _.weaveSpace : 0) + _.sendCardSpace - C[p].width / 3 : h.x + g * (C[p].width + _.posOffsetX) + (this._oWeaCard[e].length > 0 ? _.weaveSpace : 0) - C[p].width / 3 : C[p].x = 0 == p ? h.x + g * (C[p].width + _.posOffsetX) + (this._oWeaCard[e].length > 0 ? _.weaveSpace : 0) + _.sendCardSpace : h.x + g * (C[p].width + _.posOffsetX) + (this._oWeaCard[e].length > 0 ? _.weaveSpace : 0))
                    }
                }
            },
            pushDisCard: function(e, t) {
                if (0 == s.isValidViewId(e) || 0 == s.isValidCard(t))
                    return cc.error("pushDisCard() error nViewID_[%d] nCardData_[%d]", e, t),
                    !1;
                cc.log("__pl__ pushDisCard nViewId[" + e + "] nOutCard_[" + t + "]");
                var a = 0;
                2 == c.GAME_PLAYER ? a = 20 : 3 == c.GAME_PLAYER ? a = 10 : 4 == c.GAME_PLAYER && (a = 10);
                var r = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , o = d.getDisCardConfig(r)
                  , _ = this._oDisCardNode[e].childrenCount
                  , h = Math.floor(_ / a) + 1
                  , C = this._oCreateCard.createDisCard(r, t);
                this._oDisCardNode[e].addChild(C),
                C.addComponent(i),
                C.getComponent(i).setCardData(t),
                this._oDisCard[e].push(C),
                r == c.DIRECTION_NORTH ? 1 == h ? C.setPosition(-_ * (C.width + o.posOffsetX), 0) : 2 == h ? C.setPosition(-(_ - a) * (C.width + o.posOffsetX), 1 * -o.lineHeight) : 3 == h && C.setPosition(-(_ - 2 * a) * (C.width + o.posOffsetX), 10) : r == c.DIRECTION_WEST ? 1 == h ? C.setPosition(0, -_ * (C.width + o.posOffsetY)) : 2 == h ? C.setPosition(1 * o.lineHeight, -(_ - a) * (C.width + o.posOffsetY)) : 3 == h && C.setPosition(10, -(_ - 2 * a) * (C.width + o.posOffsetY)) : r == c.DIRECTION_SOUTH ? 1 == h ? (C.setPosition(_ * (C.width + o.posOffsetX), 0),
                C.zIndex = 100 - _) : 2 == h ? (C.setPosition((_ - a) * (C.width + o.posOffsetX), 1 * o.lineHeight),
                C.zIndex = 100 - _) : 3 == h && (C.setPosition((_ - 2 * a) * (C.width + o.posOffsetX), 10),
                C.zIndex = _ + 100) : r == c.DIRECTION_EAST && (1 == h ? (C.setPosition(0, _ * (C.width + o.posOffsetY)),
                C.zIndex = 100 - _) : 2 == h ? (C.setPosition(1 * -o.lineHeight, (_ - a) * (C.width + o.posOffsetY)),
                C.zIndex = 100 - _) : 3 == h && (C.setPosition(-10, (_ - 2 * a) * (C.width + o.posOffsetY)),
                C.zIndex = 100 - _ + 100)),
                this._nPLActionState[e].push(s.PLAC.ACTOIN_STOP)
            },
            popDisCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("popDisCard() error nViewID_[%d] ", e),
                    !1;
                if (this._oDisCard[e].length > 0) {
                    var t = this._oDisCard[e].pop();
                    this._oDisCardNode[e].removeChild(t),
                    this.hideCurrentCardFlag()
                } else
                    cc.error("popDisCard() error this._oDisCard[nViewID_].length == 0");
                this._nPLActionState[e].pop()
            },
            getWeaCardEndPos: function(e) {
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = new cc.v2(0,0);
                if (t == c.DIRECTION_NORTH)
                    (i = this._oWeaCard[e].pop()) && ((a = i.getPosition()).x = a.x - i.width * i.scale,
                    this._oWeaCard[e].push(i));
                else if (t == c.DIRECTION_WEST)
                    (i = this._oWeaCard[e].pop()) && ((a = i.getPosition()).y = a.y - i.height * i.scale,
                    this._oWeaCard[e].push(i));
                else if (t == c.DIRECTION_SOUTH)
                    (i = this._oWeaCard[e].pop()) && (a = i.getPosition(),
                    window.YC.Player.PlatformID == o.PlatformDefine.PD_MOWANG ? a.x = a.x + i.width * i.scale + d.getHandCardConfig(t).size.width / 3 : a.x = a.x + i.width * i.scale,
                    this._oWeaCard[e].push(i));
                else if (t == c.DIRECTION_EAST) {
                    var i;
                    (i = this._oWeaCard[e].pop()) && ((a = i.getPosition()).y = a.y + i.height * i.scale,
                    this._oWeaCard[e].push(i))
                }
                return a
            },
            addWeaCard: function(e, t) {
                if (0 == s.isValidViewId(e))
                    return cc.error("addWeaCard() error nViewID_[%d] ", e),
                    !1;
                var a = t._cbCardData
                  , i = t._cbCardCount
                  , r = t._cbPublicCard
                  , o = (n.switchViewChairID(c.GAME_PLAYER, this._oGameView._gameMode.getMeChairId(), t._wProvideUser),
                t._cbParam)
                  , _ = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , h = (this._oWeaCardNode[e].children,
                this._oWeaCardNode[e].childrenCount)
                  , C = this._oCreateCard.createWeaCard(_, a, i, r, o)
                  , u = d.getWeaveCardConfig(_)
                  , l = this.getWeaCardEndPos(e);
                _ == c.DIRECTION_NORTH ? h > 0 && (l.x = l.x - u.weaveSpace) : _ == c.DIRECTION_WEST ? h > 0 && (l.y = l.y - u.weaveSpace) : _ == c.DIRECTION_SOUTH ? h > 0 && (l.x = l.x + u.weaveSpace) : _ == c.DIRECTION_EAST && h > 0 && (l.y = l.y + u.weaveSpace),
                C.setPosition(l),
                this._oWeaCardNode[e].addChild(C),
                this._oWeaCard[e].push(C)
            },
            EditWeaCard: function(e, t, a, i, r, o) {
                if (0 == s.isValidViewId(t))
                    return cc.error("EditWeaCard() error nViewID_[%d] ", t),
                    !1;
                var _ = n.switchViewIDToDirection(c.GAME_PLAYER, t)
                  , d = this._oWeaCard[t][e];
                if (d) {
                    var h = d.position;
                    this._oWeaCardNode[t].removeChild(d);
                    var C = this._oCreateCard.createWeaCard(_, a, i, r, o);
                    C.setPosition(h),
                    this._oWeaCardNode[t].addChild(C),
                    this._oWeaCard[t][e] = C
                } else
                    cc.error("nWeaIndex_[%d] error ", e)
            },
            onTouchBegan: function(e) {
                this._nCurrentTouchCard,
                cc.log("---------------\x3eonTouchBegan DoubleCard = false"),
                this._bDoubleCard = !1;
                var t = !1
                  , a = e.getLocation().x
                  , r = e.getLocation().y;
                if (!this._bRunActMoveHandCard) {
                    for (var o = 0; o < c.MAX_COUNT; o++) {
                        var n = this._oHandCardNode[c.MY_VIEWID].children[o]
                          , s = n.x
                          , _ = n.y
                          , d = n.parent.convertToNodeSpaceAR(cc.v2(a, r));
                        if (4 != n.getComponent(i).getCardTouchState() && d.x > s && d.x < s + n.width * n.scale && d.y < _ + n.height * n.scale) {
                            if (3 == n.getComponent(i).getCardTouchState())
                                return !1;
                            if (n.active ? this._nCurrentTouchCard = n : this._nCurrentTouchCard = null,
                            1 == n.getComponent(i).getCardTouchState())
                                return this._bDoubleCard = !0,
                                void cc.log("---------------\x3eonTouchBegan DoubleCard = true");
                            n.active && (t = !0,
                            this.rectifyControl(),
                            n.getComponent(i).setCardTouchState(1),
                            n.y = n.y + 15,
                            this.cardPop())
                        }
                    }
                    if (0 == t) {
                        var h = this._oGameView._gameMode.getCardData(window.YC.GC.getPlayer()._wChairID)
                          , C = this._oGameView._gameMode.getCardCount(window.YC.GC.getPlayer()._wChairID);
                        this.rectifyControl(),
                        this.setHandCard(c.MY_VIEWID, h, C)
                    }
                }
            },
            onTouchMoved: function(e) {
                var t = e.getStartLocation()
                  , a = e.getLocation().x
                  , r = e.getLocation().y;
                if (null != this._nCurrentTouchCard) {
                    var o = this._oPublicCardNode[c.MY_VIEWID].children[0];
                    if ((u = o.parent.convertToNodeSpaceAR(cc.v2(a, r))).y > 149) {
                        o.active = !0,
                        o.x = u.x - o.width / 2,
                        o.y = u.y;
                        var n = o.getChildByName("CardFont");
                        null != n && o.removeChild(n);
                        var s = this._nCurrentTouchCard.getComponent(i).getCardData();
                        (n = this._oCreateCard.createHandCardFont(s)).name = "CardFont",
                        n.setPosition(o.width / 2, o.height / 2 - 5),
                        o.addChild(n)
                    } else
                        o.active = !1
                }
                Math.abs(a - t.x) > 10 && (this._bDoubleCard = !1,
                cc.log("---------------\x3eonTouchMoved1 DoubleCard = false"));
                for (var _ = 0; _ < c.MAX_COUNT; _++) {
                    var d = this._oHandCardNode[c.MY_VIEWID].children[_]
                      , h = d.x
                      , C = d.y
                      , u = d.parent.convertToNodeSpaceAR(cc.v2(a, r));
                    if (4 != d.getComponent(i).getCardTouchState() && u.x > h && u.x < h + d.width && Math.abs(u.y - C) < d.height && d.active) {
                        if (1 == d.getComponent(i).getCardTouchState())
                            return;
                        if (3 == d.getComponent(i).getCardTouchState())
                            return !1;
                        this._nCurrentTouchCard = d,
                        this._bDoubleCard = !1,
                        cc.log("---------------\x3eonTouchMoved2 DoubleCard = false"),
                        this.rectifyControl(),
                        d.getComponent(i).setCardTouchState(1),
                        d.y = d.y + 15,
                        this._oGameView._gameMode.playEffect("client/res/game/common/sound/select"),
                        this.cardPop()
                    }
                }
            },
            onTouchEnded: function(e) {
                var t, a = e.getLocation().x, r = e.getLocation().y, n = this._oPublicCardNode[c.MY_VIEWID].convertToNodeSpaceAR(cc.v2(a, r)), s = cc.v2(a, r);
                if (null != this._nCurrentTouchCard) {
                    var _ = this._nCurrentTouchCard.getComponent(i).getCardData()
                      , d = this._nCurrentTouchCard.getComponent(i).getCardIndex();
                    if (3 == this._nCurrentTouchCard.getComponent(i).getCardTouchState())
                        return !1;
                    var h = this._oGameView._gameMode.getGameSetValue(o.GameOptionString.IN_CARD_SUCCINCT);
                    if (n.y > 149) {
                        if (this._oPublicCardNode[c.MY_VIEWID].children[0].active = !1,
                        this.rectifyControl(),
                        1 == this.touchSendOutCard(_)) {
                            if (h == o.GameOptionResult.OFF)
                                this.moveHandCardAct(d);
                            else {
                                var C = this._oGameView._gameMode.getCardData(window.YC.GC.getPlayer()._wChairID)
                                  , u = this._oGameView._gameMode.getCardCount(window.YC.GC.getPlayer()._wChairID);
                                this.rectifyControl(),
                                this.setHandCard(c.MY_VIEWID, C, u)
                            }
                            this.cancelhandCardTingType(),
                            t = cc.v2(s.x, s.y)
                        }
                    } else if (this._bDoubleCard && (cc.log("---------------\x3eonTouchEnded \u53cc\u51fb\u51fa\u724c"),
                    this.rectifyControl(),
                    1 == this.touchSendOutCard(_))) {
                        h == o.GameOptionResult.OFF ? this.moveHandCardAct(d) : (C = this._oGameView._gameMode.getCardData(window.YC.GC.getPlayer()._wChairID),
                        u = this._oGameView._gameMode.getCardCount(window.YC.GC.getPlayer()._wChairID),
                        this.rectifyControl(),
                        this.setHandCard(c.MY_VIEWID, C, u)),
                        this.cancelhandCardTingType();
                        var l = this._oHandCardNode[c.MY_VIEWID].children[d];
                        t = this._oHandCardNode[c.MY_VIEWID].convertToWorldSpaceAR(l)
                    }
                    var g = this._oGameView._gameMode.getGameSetValue(o.GameOptionString.OUT_CARD_TYPE);
                    if (null != t)
                        switch (g) {
                        case o.GameOptionResult.FLY_DOWN:
                            this.zlCardMove(t);
                            break;
                        case o.GameOptionResult.FALLING_DOWN:
                            this.outCardFalling(c.MY_VIEWID, _, null, null);
                            break;
                        case o.GameOptionResult.ENLARGE_DOWN:
                            this.outCardEnlarge1(c.MY_VIEWID, _, null, null);
                            break;
                        default:
                            cc.error("outCardType error [%s]", g)
                        }
                    this._nCurrentTouchCard = null
                }
            },
            onTouchCancel: function() {
                null != this._nCurrentTouchCard && (this._nCurrentTouchCard = null,
                this._oPublicCardNode[c.MY_VIEWID].children[0].active = !1,
                this.rectifyControl())
            },
            outCardFalling: function(e, t, a, i) {
                var r = this;
                if (this._oGameView._gameMode.playEffect("client/res/game/common/sound/give"),
                this.showCurrentCardFlag(e),
                e != c.MY_VIEWID) {
                    var o = s.copyArray(this._oHandCardNode[e].children);
                    o.sort(this.cardCompare);
                    for (var n = Math.floor(Math.random() * o.length), _ = 0; null == o[n] || 0 == o[n].active; )
                        if (n = Math.floor(Math.random() * o.length),
                        (_ += 1) > 200) {
                            n = 0,
                            cc.error("count > 200");
                            break
                        }
                    cc.log("outCardEnlarge1_ viewID[%d],index[%d]", e, n),
                    o[n].active = !1;
                    for (var d = 0; d < n; d++)
                        o[d].runAction(cc.sequence(cc.moveTo(.1, o[d + 1].position), cc.callFunc(function(t, o) {
                            o == n - 1 && null != i && (r.rectifyOtherHandCard(e),
                            r.setHandCard(e, a, i))
                        }, this, d)));
                    0 == n && (r.rectifyOtherHandCard(e),
                    r.setHandCard(e, a, i))
                }
            },
            outCardEnlarge1: function(e, t, a, i) {
                var r = this
                  , o = this._oDisCard[e][this._oDisCard[e].length - 1];
                n.switchViewIDToDirection(c.GAME_PLAYER, e),
                o.scale = 1.2,
                o.y = o.y + 10;
                var _ = cc.scaleTo(.13, 1)
                  , d = cc.moveBy(.13, 0, -10)
                  , h = cc.callFunc(function() {
                    r._oGameView._gameMode.playEffect("client/res/game/common/sound/dapai"),
                    r.showCurrentCardFlag(e)
                });
                if (o.runAction(cc.sequence(cc.spawn(_, d), h)),
                e != c.MY_VIEWID) {
                    var C = s.copyArray(this._oHandCardNode[e].children);
                    C.sort(this.cardCompare);
                    for (var u = Math.floor(Math.random() * C.length), l = 0; null == C[u] || 0 == C[u].active; )
                        if (u = Math.floor(Math.random() * C.length),
                        (l += 1) > 200) {
                            u = 0,
                            cc.error("count > 200");
                            break
                        }
                    cc.log("outCardEnlarge1_ viewID[%d],index[%d]", e, u),
                    C[u].active = !1;
                    for (var g = 0; g < u; g++)
                        C[g].runAction(cc.sequence(cc.moveTo(.1, C[g + 1].position), cc.callFunc(function(t, o) {
                            o == u - 1 && null != i && (r.rectifyOtherHandCard(e),
                            r.setHandCard(e, a, i))
                        }, this, g)));
                    0 == u && (r.rectifyOtherHandCard(e),
                    r.setHandCard(e, a, i))
                }
                this._nCardEnlargeActionState[e] = s.ENLARGE_AC.ACTOIN_SHOW
            },
            outCardEnlarge2: function(e) {
                for (var t = this, a = 0; a < c.GAME_PLAYER; a++)
                    if (this._nCardEnlargeActionState[a] == s.ENLARGE_AC.ACTOIN_SHOW) {
                        this._nCardEnlargeActionState[a] = s.ENLARGE_AC.ACTOIN_WAIT_HIDE;
                        var i = this._oPublicCardNode[a].children[0];
                        if (1 == i.active) {
                            var r = cc.callFunc(function(e, a) {
                                e.opacity = 255,
                                e.active = !1,
                                t._nCardEnlargeActionState[a],
                                s.ENLARGE_AC.ACTOIN_STOP
                            }, i, a)
                              , o = e ? 0 : .5;
                            i.runAction(cc.sequence(cc.delayTime(o), cc.fadeOut(.2), r))
                        }
                    }
            },
            zlCardMove: function(e) {
                var t = this
                  , a = this._oDisCard[c.MY_VIEWID][this._oDisCard[c.MY_VIEWID].length - 1]
                  , i = a.getPosition();
                a.setPosition(a.parent.convertToNodeSpaceAR(e)),
                a.zIndex = a.zIndex + 100,
                a.scale = 1.2;
                var r = cc.moveTo(.13, i)
                  , o = cc.scaleTo(.13, 1)
                  , n = cc.callFunc(function() {
                    a.zIndex = a.zIndex - 100,
                    t._oGameView._gameMode.playEffect("client/res/game/common/sound/dapai"),
                    t.showCurrentCardFlag(c.MY_VIEWID)
                });
                a.runAction(cc.sequence(cc.spawn(r, o), n))
            },
            handCardMoveToDisCard: function(e, t, a) {
                var i = this;
                if (cc.log("nViewID_" + e + "**nCardData_" + t + "**nCardCount_" + a),
                this._oDisCard[e].length > 0) {
                    var r = s.copyArray(this._oHandCardNode[e].children);
                    r.sort(this.cardCompare);
                    var o = Math.floor(Math.random() * r.length);
                    if (null == r[o])
                        return void this.handCardMoveToDisCard(e);
                    r[o].active = !1;
                    var n = this._oDisCard[e][this._oDisCard[e].length - 1]
                      , _ = n.getPosition()
                      , d = this._oHandCardNode[e].convertToWorldSpaceAR(r[o].getPosition());
                    n.setPosition(n.parent.convertToNodeSpaceAR(d)),
                    n.scale = .78,
                    cc.log("+++++++_nOutCardIndex" + o);
                    for (var c = 0; c < o; c++)
                        r[c].runAction(cc.moveTo(.1, r[c + 1].position));
                    var h = cc.moveTo(.1, _)
                      , C = cc.scaleTo(.1, 1)
                      , u = cc.callFunc(function() {
                        i.rectifyOtherHandCard(e),
                        i._oGameView._gameMode.playEffect("client/res/game/common/sound/dapai"),
                        i.showCurrentCardFlag(e),
                        null != a && i.setHandCard(e, t, a)
                    });
                    n.runAction(cc.sequence(cc.spawn(h, C), u))
                }
            },
            rectifyOtherHandCard: function(e) {
                var t, a = n.switchViewIDToDirection(c.GAME_PLAYER, e);
                t = 0 == this._oGameView._gameMode._isRecordMode ? d.getHandCardConfig(a) : d.getRecordHandCardConfig(a);
                var i = s.copyArray(this._oHandCardNode[e].children);
                i.sort(this.cardCompare);
                for (var r = 0; r < c.MAX_COUNT; r++) {
                    var o = i[r];
                    a == c.DIRECTION_NORTH ? 0 == r ? o.setPosition(r * (t.size.width + t.posOffsetX) - t.sendCardSpace, 0) : o.setPosition(r * (t.size.width + t.posOffsetX), 0) : a == c.DIRECTION_WEST ? (0 == r ? o.setPosition(0, r * (t.size.height + t.posOffsetY) - t.sendCardSpace) : o.setPosition(0, r * (t.size.height + t.posOffsetY)),
                    o.zIndex = 1e3 - r) : a == c.DIRECTION_EAST && (0 == r ? o.setPosition(0, -r * (t.size.height + t.posOffsetY) + t.sendCardSpace) : o.setPosition(0, -r * (t.size.height + t.posOffsetY)))
                }
            },
            plCardMoveAct1: function(e, t, a, r, o) {
                cc.log("__pl__ plCardMoveAct1 nViewId[" + e + "] nOutCard_[" + t + "]");
                var _ = this
                  , d = n.switchViewIDToDirection(c.GAME_PLAYER, e);
                _._outCardActionState[e] = 1;
                var h = this._oDisCard[e].length - 1;
                if (this._oDisCard[e].length > 0) {
                    var C = this._oDisCard[e][h];
                    C.active = !1,
                    cc.log("__pl__ plCardMoveAct1 \u5148\u9690\u85cf\u5f03\u724c[" + C.getComponent(i).getCardData() + "]")
                }
                this._nPLActionState[e][h] = s.PLAC.ACTOIN_1;
                var l = this._oPublicCardNode[e].children[0]
                  , g = l.getChildByName("CardFont");
                if (null != g && l.removeChild(g),
                (g = this._oCreateCard.createHandCardFont(t)).name = "CardFont",
                g.setPosition(l.width / 2, l.height / 2 - 5),
                l.addChild(g),
                e != c.MY_VIEWID) {
                    var p = s.copyArray(this._oHandCardNode[e].children);
                    p.sort(this.cardCompare);
                    for (var m = Math.floor(Math.random() * p.length); null == p[m]; )
                        m = Math.floor(Math.random() * p.length);
                    p[m].active = !1,
                    a = this._oHandCardNode[e].convertToWorldSpaceAR(p[m].getPosition());
                    for (var I = 0; I < m; I++)
                        p[I].runAction(cc.moveTo(.1, p[I + 1].position))
                }
                l.setPosition(l.parent.convertToNodeSpaceAR(a)),
                l.scale = .8,
                l.active = !0;
                var f = cc.moveTo(.2, u[d])
                  , w = cc.scaleTo(.2, 1)
                  , A = cc.callFunc(function() {
                    e != c.MY_VIEWID && null != r && null != o && (_.rectifyOtherHandCard(e),
                    _.setHandCard(e, r, o))
                });
                l.runAction(cc.sequence(cc.spawn(f, w), A, cc.delayTime(1), cc.callFunc(function() {
                    _._nPLActionState[e][h] == s.PLAC.ACTOIN_1 ? (_._nPLActionState[e][h] = s.PLAC.ACTOIN_WAIT,
                    cc.log("__pl__ plCardMoveAct1 nViewId[" + e + "] nOutCard_[" + t + "]action1\u6267\u884cok \u8fdb\u5165wait\u72b6\u6001")) : cc.log("__pl__ plCardMoveAct1 nViewId[" + e + "] nOutCard_[" + t + "]action1\u6267\u884cok \u72b6\u6001\u4e3a[" + _._nPLActionState[e][_._oDisCard[e].length - 1] + "]")
                })))
            },
            plCardMoveAct2: function(e, t) {
                var a = this
                  , r = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , o = cc.v2(0, 0)
                  , _ = this._oDisCard[e].length - 1;
                a._outCardActionState[e] = 2,
                this._nPLActionState[e][_] != s.PLAC.ACTOIN_2 && this._nPLActionState[e][_] != s.PLAC.ACTOIN_STOP || cc.error("__pl__ plCardMoveAct2 \u52a8\u753b\u6267\u884c\u5f02\u5e38\uff1a" + this._nPLActionState[e][_]),
                this._nPLActionState[e][_] = s.PLAC.ACTOIN_2;
                var d = this._oDisCard[e][_];
                cc.log("__pl__ plCardMoveAct2 nViewId[" + e + "] nOutCard_[" + d.getComponent(i).getCardData() + "]");
                var h = d.getPosition()
                  , C = this._oPublicCardNode[e].convertToWorldSpaceAR(u[r]);
                d.zIndex = d.zIndex + 100,
                d.scale = 1.2,
                d.active = !0,
                d.setPosition(2e3, 2e3),
                r == c.DIRECTION_NORTH ? (o.x = d.parent.convertToNodeSpaceAR(C).x + d.height,
                o.y = d.parent.convertToNodeSpaceAR(C).y + d.height + 15) : r == c.DIRECTION_WEST ? (o.x = d.parent.convertToNodeSpaceAR(C).x,
                o.y = d.parent.convertToNodeSpaceAR(C).y + d.width) : r == c.DIRECTION_SOUTH ? (o.x = d.parent.convertToNodeSpaceAR(C).x,
                o.y = d.parent.convertToNodeSpaceAR(C).y) : r == c.DIRECTION_EAST && (o.x = d.parent.convertToNodeSpaceAR(C).x + d.height + 20,
                o.y = d.parent.convertToNodeSpaceAR(C).y);
                var l = cc.moveTo(.13, h)
                  , g = cc.scaleTo(.13, 1)
                  , p = cc.callFunc(function() {
                    d.zIndex = d.zIndex - 100,
                    a._outCardActionState[e] = 3,
                    a._nPLActionState[e][_] = s.PLAC.ACTOIN_STOP,
                    a._oGameView._gameMode.playEffect("client/res/game/common/sound/dapai"),
                    a.showCurrentCardFlag(e),
                    cc.log("__pl__ plCardMoveAct2 nViewId[" + e + "] nOutCard_[" + d.getComponent(i).getCardData() + "]_callFunc ok")
                })
                  , m = cc.callFunc(function() {
                    d.setPosition(o),
                    a._oPublicCardNode[e].children[0].stopAllActions(),
                    a._oPublicCardNode[e].children[0].active = !1,
                    cc.log("__pl__ plCardMoveAct2 nViewId[" + e + "] nOutCard_[" + d.getComponent(i).getCardData() + "]_callFuncStart ok")
                });
                d.runAction(cc.sequence(cc.delayTime(t), m, cc.spawn(l, g), p))
            },
            plCardMoveHide: function(e) {
                if (cc.log("__pl__ plCardMoveHide nViewId[" + e + "] "),
                null == e)
                    for (var t = 0; t < c.GAME_PLAYER; t++)
                        this._oPublicCardNode[t].children[0].active = !1,
                        this._oPublicCardNode[t].children[0].stopAllActions(),
                        this._outCardActionState[t] = 3;
                else
                    this._oPublicCardNode[e].children[0].active = !1,
                    this._oPublicCardNode[e].children[0].stopAllActions(),
                    this._outCardActionState[e] = 3
            },
            plCardShow: function(e, t) {
                cc.log("__pl__ plCardShow nViewId[" + e + "] nOutCard_[" + t + "]");
                var a = n.switchViewIDToDirection(c.GAME_PLAYER, e);
                this._oDisCard[e].length > 0 && (this._oDisCard[e][this._oDisCard[e].length - 1].active = !1);
                var i = this._oPublicCardNode[e].children[0]
                  , r = i.getChildByName("CardFont");
                this._nPLActionState[e][this._oDisCard[e].length - 1] = s.PLAC.ACTOIN_WAIT,
                i.active = !0,
                i.setPosition(u[a]),
                null != r && i.removeChild(r),
                (r = this._oCreateCard.createHandCardFont(t)).name = "CardFont",
                r.setPosition(i.width / 2, i.height / 2 - 5),
                i.addChild(r)
            },
            moveHandCardAct: function(e) {
                if (null != e)
                    if (null != this._nCurrentTouchCard) {
                        var t = this;
                        this._bRunActMoveHandCard = !0;
                        var a = this._oGameView._gameMode.getCardData(window.YC.GC.getPlayer()._wChairID)
                          , r = this._oGameView._gameMode.getCardCount(window.YC.GC.getPlayer()._wChairID)
                          , o = this._oHandCardNode[c.MY_VIEWID].children[0]
                          , n = this._oHandCardNode[c.MY_VIEWID].children;
                        if (0 == e)
                            return this._nCurrentTouchCard.active = !1,
                            this._bRunActMoveHandCard = !1,
                            this._nCurrentTouchCard.scale = 1,
                            void t.setHandCard(c.MY_VIEWID, a, r);
                        if (o.active)
                            for (var s = r - 1; s >= 0; s--)
                                if (a[s] == o.getComponent(i).getCardData()) {
                                    this._nCurrentTouchCard.active = !1,
                                    this._nCurrentTouchCard.scale = 1;
                                    var _ = r - s
                                      , d = cc.moveBy(.1, cc.v2(0, 136))
                                      , h = cc.moveTo(.1, cc.v2(n[_].x, 136))
                                      , C = cc.moveBy(.1, cc.v2(0, -68))
                                      , u = cc.rotateTo(.1, 45)
                                      , l = cc.rotateTo(.1, 0)
                                      , g = cc.moveBy(.1, cc.v2(0, -68))
                                      , p = cc.spawn(d, u)
                                      , m = cc.spawn(C, l)
                                      , I = cc.moveTo(.1, n[_].position)
                                      , f = cc.callFunc(function() {
                                        t.setHandCard(c.MY_VIEWID, a, r),
                                        t._bRunActMoveHandCard = !1
                                    });
                                    if (cc.log("_curCardIndex" + e),
                                    cc.log("_moveToIndex" + _),
                                    1 == _) {
                                        for (var w = _; w < e; w++)
                                            n[w].runAction(cc.moveTo(.1, n[w + 1].position));
                                        o.runAction(cc.sequence(I, f))
                                    } else if (_ == e)
                                        n[0].runAction(cc.sequence(p, h, m, g, f));
                                    else if (_ < e) {
                                        for (w = _; w < e; w++)
                                            n[w].runAction(cc.moveTo(.1, n[w + 1].position));
                                        n[0].runAction(cc.sequence(p, h, m, g, f))
                                    } else if (_ > e) {
                                        for (w = _; w > e; w--)
                                            n[w].runAction(cc.moveTo(.1, n[w - 1].position));
                                        n[0].runAction(cc.sequence(p, h, m, g, f))
                                    }
                                    break
                                }
                    } else
                        cc.log("sparrowpinghuCard   --moveHandCardAct    this._nCurrentTouchCard = null");
                else
                    cc.log("sparrowpinghuCard   --moveHandCardAct    curCardIndex_ = null")
            },
            rectifyControl: function() {
                for (var e = this._oHandCardNode[c.MY_VIEWID].children, t = this._oHandCardNode[c.MY_VIEWID].childrenCount, a = d.getHandCardConfig(c.DIRECTION_SOUTH), r = this._oGameView._gameMode.getCardCount(this._oGameView._gameMode.getMeChairId()), n = this.convetWeavePosToHandPos(c.MY_VIEWID, this.getWeaCardEndPos(c.MY_VIEWID)), s = 0; s < t; s++)
                    e[s].scale = 1,
                    1 == e[s].getComponent(i).getCardTouchState() && (e[s].getComponent(i).setCardTouchState(0),
                    e[s].y = e[s].y - 15,
                    this.dropCard(e[s].getComponent(i).getCardData())),
                    window.YC.Player.PlatformID == o.PlatformDefine.PD_MOWANG ? e[s].x = 0 == s ? n.x + (r - (1 == e[0].active ? 1 : 0) - s) * (e[s].width + a.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? a.weaveSpace : 0) + a.sendCardSpace - e[s].width / 3 : n.x + (r - (1 == e[0].active ? 1 : 0) - s) * (e[s].width + a.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? a.weaveSpace : 0) - e[s].width / 3 : e[s].x = 0 == s ? n.x + (r - (1 == e[0].active ? 1 : 0) - s) * (e[s].width + a.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? a.weaveSpace : 0) + a.sendCardSpace : n.x + (r - (1 == e[0].active ? 1 : 0) - s) * (e[s].width + a.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? a.weaveSpace : 0)
            },
            cardPop: function() {
                for (var e = this._oHandCardNode[c.MY_VIEWID].children, t = this._oHandCardNode[c.MY_VIEWID].childrenCount, a = 9, r = this._oGameView._gameMode.getCardCount(this._oGameView._gameMode.getMeChairId()), n = this.convetWeavePosToHandPos(c.MY_VIEWID, this.getWeaCardEndPos(c.MY_VIEWID)), s = d.getHandCardConfig(c.DIRECTION_SOUTH), _ = 0; _ < t; _++) {
                    var h = e[_];
                    1 == h.getComponent(i).getCardTouchState() && (this.popupCard(h.getComponent(i).getCardData()),
                    h.scale = 1.1,
                    a = 0),
                    window.YC.Player.PlatformID == o.PlatformDefine.PD_MOWANG ? e[_].x = 0 == _ ? n.x + (r - (1 == e[0].active ? 1 : 0) - _) * (e[_].width + s.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? s.weaveSpace : 0) + s.sendCardSpace + a - e[_].width / 3 : n.x + (r - (1 == e[0].active ? 1 : 0) - _) * (e[_].width + s.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? s.weaveSpace : 0) + a - e[_].width / 3 : e[_].x = 0 == _ ? n.x + (r - (1 == e[0].active ? 1 : 0) - _) * (e[_].width + s.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? s.weaveSpace : 0) + s.sendCardSpace + a : n.x + (r - (1 == e[0].active ? 1 : 0) - _) * (e[_].width + s.posOffsetX) + (this._oWeaCard[c.MY_VIEWID].length > 0 ? s.weaveSpace : 0) + a
                }
            },
            touchSendOutCard: function(e) {
                return cc.log("outCard" + e),
                this._oGameView.touchSendOutCard(e)
            },
            popupCard: function(e) {
                this._oGameView._gameMode.popupCard(e);
                for (var t = 0; t < c.GAME_PLAYER; t++)
                    for (var a = this._oDisCardNode[t].childrenCount, i = this._oDisCardNode[t].children, r = 0; r < a; r++)
                        i[r].__cardData && e == i[r].__cardData && (i[r].color = new cc.color(130,130,130),
                        null != (_ = i[r].getChildByName("CardFont")) && (_.color = new cc.color(130,130,130)));
                for (t = 0; t < c.GAME_PLAYER; t++)
                    for (a = this._oWeaCardNode[t].childrenCount,
                    i = this._oWeaCardNode[t].children,
                    r = 0; r < a; r++)
                        for (var o = i[r].childrenCount, n = i[r].children, s = 0; s < o; s++) {
                            var _;
                            n[s].__cardData && e == n[s].__cardData && (n[s].color = new cc.color(130,130,130),
                            null != (_ = n[s].getChildByName("CardFont")) && (_.color = new cc.color(130,130,130)))
                        }
            },
            dropCard: function(e) {
                this._oGameView._gameMode.dropCard(e);
                for (var t = 0; t < c.GAME_PLAYER; t++)
                    for (var a = this._oDisCardNode[t].childrenCount, i = this._oDisCardNode[t].children, r = 0; r < a; r++)
                        i[r].color = new cc.color(255,255,255),
                        null != (_ = i[r].getChildByName("CardFont")) && (_.color = new cc.color(255,255,255));
                for (t = 0; t < c.GAME_PLAYER; t++)
                    for (a = this._oWeaCardNode[t].childrenCount,
                    i = this._oWeaCardNode[t].children,
                    r = 0; r < a; r++)
                        for (var o = i[r].childrenCount, n = i[r].children, s = 0; s < o; s++) {
                            var _;
                            n[s].color = new cc.color(255,255,255),
                            null != (_ = n[s].getChildByName("CardFont")) && (_.color = new cc.color(255,255,255))
                        }
            },
            autoSendOutCard: function(e) {
                cc.log("autoSendOutCard" + e),
                this.cancelhandCardTingType();
                var t = this._oHandCardNode[c.MY_VIEWID].children[0]
                  , a = this._oHandCardNode[c.MY_VIEWID].convertToWorldSpaceAR(t);
                if (null != a) {
                    var i = this._oGameView._gameMode.getGameSetValue(o.GameOptionString.OUT_CARD_TYPE);
                    switch (i) {
                    case o.GameOptionResult.FLY_DOWN:
                        this.zlCardMove(a);
                        break;
                    case o.GameOptionResult.FALLING_DOWN:
                        this.outCardFalling(c.MY_VIEWID, e, null, null);
                        break;
                    case o.GameOptionResult.ENLARGE_DOWN:
                        this.outCardEnlarge1(c.MY_VIEWID, e, null, null);
                        break;
                    default:
                        cc.error("outCardType error [%s]", i)
                    }
                }
            },
            setHandCardTingType: function(e, t) {
                this.rectifyControl();
                var a = s.copyArray(this._oHandCardNode[c.MY_VIEWID].children);
                a.sort(this.cardCompare);
                var r = this._oHandCardNode[c.MY_VIEWID].childrenCount;
                if (n._and(this._oGameView._gameMode.getGameInfo()._llGameRule, s.GAME_RULE.GAME_RULE_BAO_TING)) {
                    for (var o = 0; o < r; o++)
                        if (1 == a[o].active) {
                            e._bShow ? a[o].color = new cc.color(255,255,255) : a[o].color = new cc.color(180,180,180);
                            var _ = a[o].getChildByName("CardFont");
                            null != _ && (e._bShow ? _.color = new cc.color(255,255,255) : _.color = new cc.color(180,180,180));
                            for (var d = a[o].getComponent(i).getCardData(), h = !1, C = 0; C < e._cbOutCardCount; C++)
                                e._cbOutCardData[C] == d && (h = !0,
                                a[o].color = new cc.color(255,255,255),
                                this.CreateChiHuLogo(a[o], 3),
                                e._bTouth || a[o].getComponent(i).setCardTouchState(0),
                                null != _ && (_.color = new cc.color(255,255,255)));
                            1 == t && 0 == h && (1 == a[o].getComponent(i).getCardTouchState() && (a[o].y = a[o].y - 15,
                            this.dropCard(a[o].getComponent(i).getCardData())),
                            a[o].getComponent(i).setCardTouchState(3))
                        }
                } else {
                    for (o = 0; o < r; o++) {
                        var u = a[o].getChildByName("nodeLogo");
                        null != u && cc.isValid(u, !0) && u.destroy()
                    }
                    for (o = 0; o < r; o++)
                        if (1 == a[o].active)
                            for (e._bTouth || e._bShow,
                            d = a[o].getComponent(i).getCardData(),
                            C = 0; C < e._cbOutCardCount; C++)
                                e._cbOutCardData[C] == d && (this.CreateChiHuLogo(a[o], 3),
                                e._bShow)
                }
            },
            cancelhandCardTingType: function() {
                var e = s.copyArray(this._oHandCardNode[c.MY_VIEWID].children);
                e.sort(this.cardCompare);
                for (var t = this._oHandCardNode[c.MY_VIEWID].childrenCount, a = 0; a < t; a++) {
                    3 == e[a].getComponent(i).getCardTouchState() && e[a].getComponent(i).setCardTouchState(0);
                    var r = e[a].getChildByName("nodeLogo");
                    if (null != r && r.destroy(),
                    n._and(this._oGameView._gameMode.getGameInfo()._llGameRule, s.GAME_RULE.GAME_RULE_BAO_TING)) {
                        e[a].color = new cc.color(255,255,255);
                        var o = e[a].getChildByName("CardFont");
                        null != o && (o.color = new cc.color(255,255,255))
                    }
                }
            },
            CreateChiHuLogo: function(e, t) {
                var a = new cc.Node;
                e.addChild(a),
                a.active = !0,
                a.name = "nodeLogo",
                a.setPosition(45, 145),
                1 == t ? this._oGameView._gameMode.loadRes("sparrowpinghu/res/p_da", cc.SpriteFrame, function(e, t) {
                    e ? cc.log(e) : cc.isValid(a, !0) ? a.addComponent(cc.Sprite).spriteFrame = t._res : cc.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                }) : 2 == t ? this._oGameView._gameMode.loadRes("sparrowpinghu/res/p_duo", cc.SpriteFrame, function(e, t) {
                    e ? cc.log(e) : cc.isValid(a, !0) ? a.addComponent(cc.Sprite).spriteFrame = t._res : cc.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                }) : 3 == t && this._oGameView._gameMode.loadRes("sparrowpinghu/res/p_xuanz", cc.SpriteFrame, function(e, t) {
                    e ? cc.log(e) : cc.isValid(a, !0) ? a.addComponent(cc.Sprite).spriteFrame = t._res : cc.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                })
            },
            cardCompare: function(e, t) {
                var a = e.getComponent(i).getCardIndex()
                  , r = t.getComponent(i).getCardIndex();
                return a < r ? -1 : a > r ? 1 : 0
            },
            getHandCardpos: function() {},
            resetData: function() {
                this.plCardMoveHide(),
                this._nCurrentTouchCard = null;
                for (var e = 0; e < c.GAME_PLAYER; e++) {
                    var t = this._oHandCardNode[e].children
                      , a = this._oHandCardNode[e].childrenCount;
                    e == c.MY_VIEWID && this.rectifyControl();
                    for (var r = 0; r < a; r++) {
                        var o = t[r].getChildByName("CardFont");
                        null != o && t[r].removeChild(o),
                        t[r].getComponent(i).resetData(),
                        t[r].active = !1
                    }
                    this.resetGameEndHandCard(e),
                    this._oDisCardNode[e].removeAllChildren(),
                    this._oDisCard[e].length = 0,
                    this._oWeaCardNode[e].removeAllChildren(),
                    this._oWeaCard[e].length = 0,
                    this._nPLActionState[e].length = 0
                }
                this.node && (this.hideCurrentCardFlag(),
                this.node.stopAllActions())
            },
            createGameEndHandCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("createGameEndHandCard() error nViewID_[%d]", e),
                    !1;
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = new cc.Node;
                a.setPosition(C[t]),
                this.node.addChild(a);
                for (var r = 0; r < c.MAX_COUNT; r++) {
                    var o = this._oCreateCard.createGameEndHandCardSpr(t, null);
                    o.addComponent(i),
                    a.addChild(o),
                    o.active = !1,
                    o.getComponent(i).setCardIndex(r),
                    t == c.DIRECTION_NORTH ? 0 == r ? o.y = -4 : o.setPosition(r * o.width, -4) : t == c.DIRECTION_WEST ? (0 == r ? o.setPosition(-28, -30) : o.setPosition(-28, r * (o.height - 15) - 20),
                    o.zIndex = 100 - r) : t == c.DIRECTION_SOUTH ? 0 == r ? o.setPosition(155, 7) : o.setPosition(130 - r * (o.width + 12), 7) : t == c.DIRECTION_EAST && (0 == r ? o.setPosition(25, 30) : o.setPosition(25, 20 - r * (o.height - 15)))
                }
                return a
            },
            resetGameEndHandCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("resetGameEndHandCard() error nViewID_[%d]", e),
                    !1;
                var t = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , a = s.copyArray(this._oGameEndHandCardNode[e].children);
                a.sort(this.cardCompare);
                for (var r = this._oGameEndHandCardNode[e].childrenCount, o = 0; o < r; o++) {
                    var _ = a[o].getChildByName("CardFont");
                    null != _ && a[o].removeChild(_),
                    a[o].getComponent(i).resetData(),
                    a[o].active = !1,
                    t == c.DIRECTION_NORTH ? 0 == o ? a[o].y = -4 : a[o].setPosition(o * a[o].width, -4) : t == c.DIRECTION_WEST ? 0 == o ? a[o].setPosition(-28, -30) : a[o].setPosition(-28, o * (a[o].height - 15) - 20) : t == c.DIRECTION_SOUTH ? 0 == o ? a[o].setPosition(155, 7) : a[o].setPosition(130 - o * (a[o].width + 12), 7) : t == c.DIRECTION_EAST && (0 == o ? a[o].setPosition(25, 20) : a[o].setPosition(25, 20 - o * (a[o].height - 15)))
                }
            },
            showHuCard: function(e, t, a, r, o, _, h) {
                if (0 == s.isValidViewId(e))
                    return cc.error("showHuCard() error nViewID_[%d]", e),
                    !1;
                var C = s.copyArray(t)
                  , u = a;
                u < 14 && 0 == C[u] && (C[u] = r,
                u += 1);
                var l = new Array;
                l[c.DIRECTION_NORTH] = cc.v2(40, 60),
                l[c.DIRECTION_WEST] = cc.v2(22, 56),
                l[c.DIRECTION_SOUTH] = cc.v2(90, 129),
                l[c.DIRECTION_EAST] = cc.v2(22, 56);
                var g = s.copyArray(this._oGameEndHandCardNode[e].children);
                g.sort(this.cardCompare);
                var p = this._oGameEndHandCardNode[e].childrenCount
                  , m = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , I = (this.convetWeavePosToGameEndPos(e, this.getWeaCardEndPos(e)),
                d.getHandCardConfig(m))
                  , f = s.copyArray(this._oHandCardNode[e].children);
                f.sort(this.cardCompare);
                var w = cc.v2(0, 0);
                if (1 == _) {
                    f.sort(this.cardCompare),
                    f[0].active = !1;
                    var A = cc.v2(f[0].position.x, f[0].position.y);
                    w = this._oHandCardNode[e].convertToWorldSpace(A)
                } else
                    for (var E = 0; E < this._oHandCardNode[e].childrenCount; E++)
                        if (f[E] && f[E].active) {
                            A = cc.v2(0, 0),
                            m == c.DIRECTION_NORTH ? A = cc.v2(f[E].position.x - (f[E].width + I.posOffsetX + I.sendCardSpace), f[E].position.y) : m == c.DIRECTION_WEST ? A = cc.v2(f[E].position.x, f[E].position.y - (f[E].height + I.posOffsetY + I.sendCardSpace)) : m == c.DIRECTION_SOUTH ? A = cc.v2(f[E].position.x + (f[E].width + I.posOffsetX) + I.sendCardSpace, f[E].position.y) : m == c.DIRECTION_EAST && (A = cc.v2(f[E].position.x, f[E].position.y + (f[E].height + I.posOffsetY) + I.sendCardSpace)),
                            w = this._oHandCardNode[e].convertToWorldSpace(A);
                            break
                        }
                var D = new Array;
                if (o != e) {
                    if (this._oDisCard[o].length > 0) {
                        var S = this._oDisCard[o][this._oDisCard[o].length - 1]
                          , v = S.parent.convertToWorldSpaceAR(S.getPosition());
                        D[0] = v,
                        cc.log(v)
                    }
                } else
                    D[0] = cc.v2(0, 0);
                for (D[1] = w,
                h(D),
                E = 0; E < p; E++)
                    g[E].active = !1,
                    g[E].getComponent(i).setCardData(0);
                for (E = 0; E < c.MAX_COUNT; E++)
                    if (0 != C[E]) {
                        var R = u - 1 - E;
                        if (R < 0 || R >= c.MAX_COUNT) {
                            cc.log("\u975e\u6cd5index[%d]", R);
                            continue
                        }
                        if (u - 1 == E) {
                            if (g[R].active = !0,
                            C && 1 == s.isValidCard(C[E])) {
                                g[R].getComponent(i).setCardData(C[E]);
                                var G = g[R].getChildByName("CardFont");
                                null != G && g[R].removeChild(G),
                                G = this._oCreateCard.createHandCardFont(C[E]),
                                m == c.DIRECTION_NORTH ? (g[R].x = this._oGameEndHandCardNode[e].convertToNodeSpace(w).x - 10,
                                G.setPosition(-g[R].width / 2, g[R].height / 2 - 49),
                                G.scale = .4) : m == c.DIRECTION_WEST ? (g[R].y = this._oGameEndHandCardNode[e].convertToNodeSpace(w).y - 30,
                                G.setPosition(g[R].width / 2, g[R].height / 2 - 40),
                                G.scale = .4,
                                G.angle = -90) : m == c.DIRECTION_SOUTH ? (g[R].x = this._oGameEndHandCardNode[e].convertToNodeSpace(w).x + 20,
                                G.setPosition(g[R].width / 2, g[R].height / 2 + 10),
                                G.scale = .8) : m == c.DIRECTION_EAST && (g[R].y = this._oGameEndHandCardNode[e].convertToNodeSpace(w).y + 20,
                                G.setPosition(-g[R].width / 2, g[R].height / 2 + 8),
                                G.scale = .4,
                                G.angle = 90),
                                G.name = "CardFont",
                                g[R].addChild(G)
                            }
                            var N = g[R].parent.convertToNodeSpaceAR(w);
                            m == c.DIRECTION_NORTH || m == c.DIRECTION_SOUTH ? g[R].x = N.x : m != c.DIRECTION_WEST && m != c.DIRECTION_EAST || (g[R].y = N.y)
                        }
                    }
            },
            hideHandCard: function(e) {
                if (0 == s.isValidViewId(e))
                    return cc.error("hideHandCard() error nViewID_[%d]", e),
                    !1;
                for (var t = this._oHandCardNode[e].children, a = this._oHandCardNode[e].childrenCount, i = 0; i < a; i++) {
                    var r = t[i].getChildByName("CardFont");
                    null != r && t[i].removeChild(r),
                    t[i].active = !1
                }
            },
            deleteHuCard: function(e, t) {
                t && this._oDisCard[e].length > 0 && (this._oDisCard[e][this._oDisCard[e].length - 1].active = !1)
            },
            setGameEndHandCard: function(e, t, a, r, _, h, C, u, l, g, p) {
                if (0 == s.isValidViewId(e))
                    return cc.error("setGameEndHandCard() error nViewID_[%d]", e),
                    !1;
                var m = s.copyArray(t)
                  , I = a;
                0 == p && 1 == _ && I < 14 && 0 == m[I] && (m[I] = r,
                I += 1);
                var f = new Array;
                f[c.DIRECTION_NORTH] = cc.v2(37.4, 55.55),
                f[c.DIRECTION_WEST] = cc.v2(52.5, 47.25),
                f[c.DIRECTION_SOUTH] = cc.v2(68, 101),
                f[c.DIRECTION_EAST] = cc.v2(52.5, 47.25);
                var w = s.copyArray(this._oGameEndHandCardNode[e].children);
                w.sort(this.cardCompare);
                for (var A = this._oGameEndHandCardNode[e].childrenCount, E = n.switchViewIDToDirection(c.GAME_PLAYER, e), D = this.convetWeavePosToGameEndPos(e, this.getWeaCardEndPos(e)), S = d.getHandCardConfig(E), v = this._oWeaCardNode[e].convertToWorldSpace(this._oWeaCardNode[e].position.x, this._oWeaCardNode[e].position.y), R = 0; R < A; R++)
                    w[R].active = !1,
                    w[R].getComponent(i).setCardData(0);
                for (R = 0; R < c.MAX_COUNT; R++)
                    if (0 != m[R]) {
                        var G = I - 1 - R
                          , N = !0;
                        if (0 == C)
                            if (1 == u) {
                                var M = o.INVALID_CHAIR;
                                this._oGameView._gameMode._nCurrentUser != o.INVALID_CHAIR && (M = n.switchViewChairID(c.GAME_PLAYER, l, this._oGameView._gameMode._nCurrentUser)),
                                M != e && (G = I - R,
                                N = !1)
                            } else
                                0 == p ? 1 == _ ? G = I - 1 - R : (G = I - R,
                                N = !1) : 1 == _ ? G = 1 == g ? I - 1 - R : I - R : 1 == g ? (G = I - 1 - R,
                                N = !1) : (G = I - R,
                                N = !1);
                        if (G < 0 || G >= c.MAX_COUNT) {
                            cc.log("\u975e\u6cd5index[%d]", G);
                            continue
                        }
                        if (w[G].active = !0,
                        m && 1 == s.isValidCard(m[R])) {
                            w[G].getComponent(i).setCardData(m[R]);
                            var b = w[G].getChildByName("CardFont");
                            null != b && w[G].removeChild(b),
                            b = this._oCreateCard.createHandCardFont(m[R]),
                            E == c.DIRECTION_NORTH ? (w[G].x = D.x - (R * (w[G].width + .5) + S.weaveSpace),
                            1 == N && I - 1 == R && (w[G].x = D.x - (R * (w[G].width + .5) + S.weaveSpace + S.sendCardSpace)),
                            b.setPosition(-w[G].width / 2, w[G].height / 2 - 49),
                            b.scale = .4) : E == c.DIRECTION_WEST ? (h > 0 && (w[G].y = this._oGameEndHandCardNode[e].convertToNodeSpace(v).y - 3 * f[E].y - R * (w[G].height - 15) + 50),
                            1 == N && I - 1 == R && (w[G].y = w[G].y - 20),
                            b.setPosition(w[G].width / 2, w[G].height / 2 - 40),
                            b.scale = .4,
                            b.angle = -90) : E == c.DIRECTION_SOUTH ? (w[G].x = D.x + R * (w[G].width + 12) + (this._oWeaCard[e].length > 0 ? S.weaveSpace : 0),
                            1 == N && I - 1 == R && (w[G].x = D.x + R * (w[G].width + 12) + (this._oWeaCard[e].length > 0 ? S.weaveSpace : 0) + S.sendCardSpace),
                            b.setPosition(w[G].width / 2, w[G].height / 2 + 10),
                            b.scale = .8) : E == c.DIRECTION_EAST && (h > 0 && (w[G].y = this._oGameEndHandCardNode[e].convertToNodeSpace(v).y - 3 * f[E].y + R * (w[G].height - 15) + 240),
                            1 == N && I - 1 == R && (w[G].y = w[G].y + 20),
                            b.setPosition(-w[G].width / 2, w[G].height / 2 + 8),
                            b.scale = .4,
                            b.angle = 90),
                            b.name = "CardFont",
                            w[G].addChild(b)
                        }
                    }
            },
            startAction: function(e, t, a, r, _) {
                var h = this;
                if (0 == s.isValidViewId(e))
                    return cc.error("setHandCard() error nViewID_[%d]", e),
                    !1;
                for (var C = s.copyArray(this._oHandCardNode[e].children), u = s.copyArray(t), l = (this._oGameView._gameMode.getMeChairId(),
                0); l < u.length; l++)
                    0 == u[l] && u.splice(l, 1);
                u.sort(function() {
                    return .5 - Math.random()
                }),
                C.sort(this.cardCompare);
                var g = this._oHandCardNode[e].childrenCount
                  , p = o.INVALID_CHAIR;
                this._oGameView._gameMode._nCurrentUser != o.INVALID_CHAIR && (p = n.switchViewChairID(c.GAME_PLAYER, r, this._oGameView._gameMode._nCurrentUser));
                var m = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                  , I = d.getHandCardConfig(m)
                  , f = this.convetWeavePosToHandPos(e, this.getWeaCardEndPos(e));
                for (l = 0; l < g; l++)
                    C[l].active = !1,
                    C[l].getComponent(i).setCardData(0);
                for (l = 0; l < a; l++) {
                    var w = a - 1 - l;
                    if (p != e && (w = a - l),
                    w < 0 || w >= c.MAX_COUNT)
                        cc.log("\u975e\u6cd5index[%d]", w);
                    else {
                        var A = C[w].y + 2020;
                        if (C[w].y = A,
                        C[w].active = !0,
                        e == c.MY_VIEWID && u && 1 == s.isValidCard(u[l])) {
                            C[w].getComponent(i).setCardData(u[l]);
                            var E = C[w].getChildByName("CardFont");
                            null != E && C[w].removeChild(E),
                            (E = this._oCreateCard.createHandCardFont(u[l])).setPosition(C[w].width / 2, C[w].height / 2 - 5),
                            E.name = "CardFont",
                            C[w].addChild(E)
                        }
                        m == c.DIRECTION_NORTH ? C[w].x = 0 == w ? f.x - (l * (C[w].width + I.posOffsetX) + I.weaveSpace + I.sendCardSpace) : f.x - (l * (C[w].width + I.posOffsetX) + I.weaveSpace) : m == c.DIRECTION_SOUTH && (C[w].x = 0 == w ? f.x + l * (C[w].width + I.posOffsetX) + (this._oWeaCard[e].length > 0 ? I.weaveSpace : 0) + I.sendCardSpace : f.x + l * (C[w].width + I.posOffsetX) + (this._oWeaCard[e].length > 0 ? I.weaveSpace : 0)),
                        C[w].runAction(cc.sequence(cc.delayTime(.05 * parseInt(l / 4)), cc.moveTo(0, cc.v2(C[w].x, A - 2e3)), cc.moveTo(.05, cc.v2(C[w].x, A - 2020))))
                    }
                }
                var D = 0;
                for (l = 0; l < a; l++)
                    w = a - 1 - l,
                    p != e && (w = a - l),
                    w < 0 || w >= c.MAX_COUNT ? cc.log("\u975e\u6cd5index[%d]", w) : C[w].runAction(cc.sequence(cc.delayTime(.25), cc.callFunc(function(i) {
                        var r = i.getChildByName("CardFont");
                        null != r && i.removeChild(r),
                        m == c.DIRECTION_NORTH ? (i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("WeaCardBack_S"),
                        i.width = I.size.width,
                        i.height = I.size.height) : m == c.DIRECTION_WEST ? (i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("WeaCardBack_W"),
                        i.width = I.size.width,
                        i.height = I.size.height - 10) : m == c.DIRECTION_SOUTH ? (i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("WeaCardBack_S"),
                        i.width = I.size.width,
                        i.height = I.size.height) : m == c.DIRECTION_EAST && (i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("WeaCardBack_W"),
                        i.width = I.size.width,
                        i.height = I.size.height - 10),
                        h._oGameView._gameMode.playEffect("client/res/game/common/sound/shuffle"),
                        i.runAction(cc.sequence(cc.delayTime(.3), cc.callFunc(function(i) {
                            m == c.DIRECTION_NORTH ? i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("HandCard_N") : m == c.DIRECTION_WEST ? i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("HandCard_E") : m == c.DIRECTION_SOUTH ? i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("HandCard") : m == c.DIRECTION_EAST && (i.getComponent(cc.Sprite).spriteFrame = h._oCreateCard._CardBackAtlas.getSpriteFrame("HandCard_W")),
                            i.width = I.size.width,
                            i.height = I.size.height,
                            (D += 1) == a && (h.setHandCard(e, t, a),
                            h.node.resumeSystemEvents(!0),
                            _())
                        }, i)))
                    }, w)))
            },
            showCurrentCardFlag: function(e) {
                var t = this;
                if (null == t.sp_currentCardFlag)
                    t.sp_currentCardFlag = new cc.Node("sp_currentCardFlag"),
                    t._oGameView._gameMode.loadRes("client/res/game/common/texture/arrow", cc.SpriteFrame, function(a, i) {
                        if (a)
                            cc.log(a);
                        else {
                            t.sp_currentCardFlag.addComponent(cc.Sprite).spriteFrame = i._res,
                            t.sp_currentCardFlag.active = !0,
                            t.sp_currentCardFlag.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.3, cc.v2(0, 25)), cc.moveBy(.3, cc.v2(0, -25))))),
                            t.node.addChild(t.sp_currentCardFlag, 200);
                            var r = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                              , o = t._oDisCardNode[e].convertToWorldSpaceAR(t._oDisCard[e][t._oDisCard[e].length - 1].position)
                              , s = t.node.convertToNodeSpaceAR(o);
                            r == c.DIRECTION_NORTH ? (s.x -= 25,
                            s.y -= 5) : r == c.DIRECTION_WEST ? s.x += 35 : r == c.DIRECTION_SOUTH ? (s.x += 25,
                            s.y += 65) : r == c.DIRECTION_EAST && (s.x -= 35,
                            s.y += 60),
                            t.sp_currentCardFlag.setPosition(s)
                        }
                    });
                else {
                    t.sp_currentCardFlag.active = !0,
                    t.sp_currentCardFlag.stopAllActions();
                    var a = n.switchViewIDToDirection(c.GAME_PLAYER, e)
                      , i = t._oDisCardNode[e].convertToWorldSpaceAR(t._oDisCard[e][t._oDisCard[e].length - 1].position)
                      , r = t.node.convertToNodeSpaceAR(i);
                    a == c.DIRECTION_NORTH ? (r.x -= 25,
                    r.y -= 5) : a == c.DIRECTION_WEST ? r.x += 35 : a == c.DIRECTION_SOUTH ? (r.x += 25,
                    r.y += 65) : a == c.DIRECTION_EAST && (r.x -= 35,
                    r.y += 60),
                    t.sp_currentCardFlag.setPosition(r),
                    t.sp_currentCardFlag.runAction(cc.repeatForever(cc.sequence(cc.moveBy(.3, cc.v2(0, 25)), cc.moveBy(.3, cc.v2(0, -25)))))
                }
            },
            hideCurrentCardFlag: function() {
                null != this.sp_currentCardFlag && (this.sp_currentCardFlag.stopAllActions(),
                this.sp_currentCardFlag.active = !1)
            },
            convetWeavePosToHandPos: function(e, t) {
                var a = this._oHandCardNode[e].children
                  , i = this._oWeaCardNode[e].convertToWorldSpaceAR(t);
                return a[0].parent.convertToNodeSpaceAR(i)
            },
            convetWeavePosToGameEndPos: function(e, t) {
                var a = this._oGameEndHandCardNode[e].children
                  , i = this._oWeaCardNode[e].convertToWorldSpaceAR(t);
                return a[0].parent.convertToNodeSpaceAR(i)
            },
            setPromptCardStyle: function(e) {
                if (null != e) {
                    this.onTouchCancel(),
                    this.node.pauseSystemEvents(!0),
                    cc.log("111________this.node.pauseSystemEvents(true);");
                    var t = function() {
                        0 != this._oGameView._gameMode._nActionMask && (this.node.pauseSystemEvents(!0),
                        cc.log("222________this.node.pauseSystemEvents(true);")),
                        window.YC.GC.getTimer().remove(t)
                    }
                    .bind(this);
                    window.YC.GC.getTimer().add(t, 0);
                    var a = s.copyArray(this._oHandCardNode[c.MY_VIEWID].children);
                    a.sort(this.cardCompare);
                    for (var r = this._oHandCardNode[c.MY_VIEWID].childrenCount, o = 0; o < r; o++) {
                        3 == a[o].getComponent(i).getCardTouchState() ? (a[o].getComponent(i).setCardTouchState(0),
                        a[o].y >= 30 && (a[o].y = a[o].y - 15 - 15)) : 1 == a[o].getComponent(i).getCardTouchState() ? (a[o].getComponent(i).setCardTouchState(0),
                        a[o].y = a[o].y - 15) : 4 == a[o].getComponent(i).getCardTouchState() && (a[o].getComponent(i).setCardTouchState(0),
                        a[o].y = a[o].y - 15 - 15);
                        for (var n = a[o].getComponent(i).getCardData(), _ = 0; _ < e.length; _++)
                            if (n == e[_]) {
                                a[o].getComponent(i).setCardTouchState(4),
                                a[o].y = a[o].y + 15 + 15;
                                break
                            }
                    }
                }
            },
            cancelPromptCardStyle: function() {
                this.node.resumeSystemEvents(!0);
                var e = s.copyArray(this._oHandCardNode[c.MY_VIEWID].children);
                e.sort(this.cardCompare);
                for (var t = this._oHandCardNode[c.MY_VIEWID].childrenCount, a = 0; a < t; a++)
                    3 == e[a].getComponent(i).getCardTouchState() ? (e[a].getComponent(i).setCardTouchState(0),
                    e[a].y >= 30 && (e[a].y = e[a].y - 15 - 15)) : 1 == e[a].getComponent(i).getCardTouchState() ? (e[a].getComponent(i).setCardTouchState(0),
                    e[a].y = e[a].y - 15) : 4 == e[a].getComponent(i).getCardTouchState() && (e[a].getComponent(i).setCardTouchState(0),
                    e[a].y = e[a].y - 15 - 15)
            },
            changeCardFontSize: function() {
                for (var e = 0; e < c.GAME_PLAYER; e++) {
                    var t = n.switchViewIDToDirection(c.GAME_PLAYER, e);
                    this._oHandCardNode[e].setPosition(d.getHandCardNodePos(t)),
                    this._oWeaCardNode[e].setPosition(d.getWeaveCardNodePos(t))
                }
                this._oHandCardNode[c.MY_VIEWID].scale = 1,
                this._oWeaCardNode[c.MY_VIEWID].scale = 1,
                this._oGameEndHandCardNode[c.MY_VIEWID].scale = 1,
                this.initScreenFit(),
                this.changeCardBackRes()
            },
            changeCardBackRes: function() {
                for (var e = 0; e < c.GAME_PLAYER; e++) {
                    this.changeNodeSprite(this._oHandCardNode[e]),
                    this.changeNodeSprite(this._oDisCardNode[e]);
                    for (var t = this._oWeaCardNode[e].childrenCount, a = this._oWeaCardNode[e].children, i = 0; i < t; i++)
                        this.changeNodeSprite(a[i]);
                    this.changeSprite(this._oPublicCardNode[e].getChildByName("outCard")),
                    this.changeNodeSprite(this._oGameEndHandCardNode[e])
                }
            },
            changeNodeSprite: function(e) {
                for (var t = e.childrenCount, a = e.children, i = 0; i < t; i++)
                    this.changeSprite(a[i])
            },
            changeSprite: function(e) {
                if (e && e._resName) {
                    var t = this._oCreateCard.createSpriteFrame(e._resName);
                    null == t && cc.error("changeNodeSprite() newFrame == null");
                    var a = e.width
                      , i = e.height;
                    e.getComponent(cc.Sprite).spriteFrame = t,
                    e.width = a,
                    e.height = i
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        ResBase: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuCardNode: "sparrowpinghuCardNode",
        sparrowpinghuCreateCard: "sparrowpinghuCreateCard",
        sparrowpinghuGameConfig: "sparrowpinghuGameConfig",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }],
    sparrowpinghuCreateCard: [function(e, t) {
        "use strict";
        cc._RF.push(t, "8f4daOtqYBFx5jtzXc3u9R6", "sparrowpinghuCreateCard");
        var a = e("ResBase")
          , i = e("sparrowpinghuCMD")
          , r = e("sparrowpinghuGameLogic")
          , o = e("GlobalDefine").UserDirection
          , n = e("sparrowpinghuGameConfig").cardConfig;
        cc.Class({
            extends: a,
            properties: {},
            onLoad: function() {
                cc.log("CreateCard onLoad"),
                this._CardBackAtlas = null,
                this._CardFontAtlas = null
            },
            start: function() {},
            setCardFontAtlas: function(e) {
                this._CardFontAtlas = e
            },
            setCardBackAtlas: function(e) {
                this._CardBackAtlas = e
            },
            createHandCardSpr: function(e, t) {
                var a = new cc.Node
                  , i = a.addComponent(cc.Sprite)
                  , s = n.getHandCardConfig(e);
                if (e == o.DIRECTION_NORTH ? (a._anchorPoint = cc.v2(1, 1),
                i.spriteFrame = this._CardBackAtlas.getSpriteFrame("HandCard_N"),
                a._resName = "HandCard_N") : e == o.DIRECTION_WEST ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("HandCard_E"),
                a._anchorPoint = cc.v2(0, 1),
                a._resName = "HandCard_E") : e == o.DIRECTION_SOUTH ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("HandCard"),
                a._anchorPoint = cc.v2(0, 0),
                a._resName = "HandCard") : e == o.DIRECTION_EAST && (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("HandCard_W"),
                a._resName = "HandCard_W",
                a._anchorPoint = cc.v2(1, 0)),
                i.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                a.width = s.size.width,
                a.height = s.size.height,
                1 == r.isValidCard(t) && e == o.DIRECTION_SOUTH) {
                    var _ = this.createHandCardFont(t);
                    _.setPosition(a.width / 2, a.height / 2 + s.fontPosOffsetY),
                    _.setScale(s.fontScale),
                    a.addChild(_)
                }
                return a
            },
            createHandCardFont: function(e) {
                if (0 == r.isValidCard(e))
                    return cc.error("createHandCardFont() nCardData_ == null"),
                    null;
                var t = r.SwitchToCardIndex(e) + 1
                  , a = new cc.Node;
                return a.addComponent(cc.Sprite).spriteFrame = this._CardFontAtlas.getSpriteFrame("CardFont" + t),
                a.name = "CardFont",
                a
            },
            createDisCard: function(e, t) {
                var a = new cc.Node
                  , s = a.addComponent(cc.Sprite);
                e == o.DIRECTION_NORTH ? (a._anchorPoint = cc.v2(1, 1),
                a._resName = "DisCard_S",
                s.spriteFrame = this._CardBackAtlas.getSpriteFrame("DisCard_S")) : e == o.DIRECTION_WEST ? (s.spriteFrame = this._CardBackAtlas.getSpriteFrame("DisCard_W"),
                a._resName = "DisCard_W",
                a._anchorPoint = cc.v2(0, 1)) : e == o.DIRECTION_SOUTH ? (s.spriteFrame = this._CardBackAtlas.getSpriteFrame("DisCard_S"),
                a._resName = "DisCard_S",
                a._anchorPoint = cc.v2(0, 0)) : e == o.DIRECTION_EAST && (s.spriteFrame = this._CardBackAtlas.getSpriteFrame("DisCard_W"),
                a._resName = "DisCard_W",
                a._anchorPoint = cc.v2(1, 0));
                var _ = n.getDisCardConfig(e);
                if (s.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                a.width = _.size.width,
                a.height = _.size.height,
                1 == r.isValidCard(t)) {
                    var d = this.createHandCardFont(t);
                    d.setScale(_.fontScale),
                    e == i.DIRECTION_NORTH ? d.setPosition(-a.width / 2 + _.fontPosOffsetX, -a.height / 2 + _.fontPosOffsetY) : e == i.DIRECTION_WEST ? (d.setPosition(a.width / 2 + _.fontPosOffsetX, -a.height / 2 + _.fontPosOffsetY),
                    d.angle = -90) : e == i.DIRECTION_SOUTH ? d.setPosition(a.width / 2 + _.fontPosOffsetX, a.height / 2 + _.fontPosOffsetY) : e == i.DIRECTION_EAST && (d.setPosition(-a.width / 2 + _.fontPosOffsetX, a.height / 2 + _.fontPosOffsetY),
                    d.angle = 90),
                    a.addChild(d),
                    a.__cardData = t
                }
                return a
            },
            createOneWeaCard: function(e, t, a) {
                var i = new cc.Node
                  , r = i.addComponent(cc.Sprite);
                e == o.DIRECTION_NORTH ? (i._anchorPoint = cc.v2(1, 1),
                1 == a ? (i._resName = "WeaCard_S",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_S")) : (i._resName = "WeaCardBack_S",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCardBack_S"))) : e == o.DIRECTION_WEST ? (1 == a ? (i._resName = "WeaCard_W",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W")) : (i._resName = "WeaCardBack_W",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCardBack_W")),
                i._anchorPoint = cc.v2(0, 1)) : e == o.DIRECTION_SOUTH ? (1 == a ? (i._resName = "WeaCard_S",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_S")) : (i._resName = "WeaCardBack_S",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCardBack_S")),
                i._anchorPoint = cc.v2(0, 0)) : e == o.DIRECTION_EAST && (1 == a ? (i._resName = "WeaCard_W",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W")) : (i._resName = "WeaCardBack_W",
                r.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCardBack_W")),
                i._anchorPoint = cc.v2(1, 0));
                var s = n.getWeaveCardConfig(e);
                if (r.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                i.width = s.size.width,
                i.height = s.size.height,
                a && t && i) {
                    var _ = this.createHandCardFont(t);
                    _.setScale(s.fontScale),
                    e == o.DIRECTION_NORTH ? _.setPosition(-i.width / 2, -i.height / 2 + s.fontPosOffsetY) : e == o.DIRECTION_WEST ? (_.setPosition(i.width / 2, -i.height / 2 + s.fontPosOffsetY),
                    _.angle = -90) : e == o.DIRECTION_SOUTH ? _.setPosition(i.width / 2, i.height / 2 + s.fontPosOffsetY) : e == o.DIRECTION_EAST && (_.setPosition(-i.width / 2, i.height / 2 + s.fontPosOffsetY),
                    _.angle = 90),
                    i.addChild(_),
                    i.__cardData = t
                }
                return i
            },
            createWeaCard: function(e, t, a, r) {
                var o = new cc.Node
                  , s = n.getWeaveCardConfig(e);
                e == i.DIRECTION_NORTH ? (o._anchorPoint = cc.v2(1, 1),
                o.width = s.size.width * (a > 3 ? 3 : a),
                o.height = s.size.height) : e == i.DIRECTION_WEST ? (o._anchorPoint = cc.v2(0, 1),
                o.width = s.size.width,
                o.height = s.size.height * (a > 3 ? 3 : a)) : e == i.DIRECTION_SOUTH ? (o._anchorPoint = cc.v2(0, 0),
                o.width = s.size.width * (a > 3 ? 3 : a),
                o.height = s.size.height) : e == i.DIRECTION_EAST && (o._anchorPoint = cc.v2(1, 0),
                o.width = s.size.width,
                o.height = s.size.height * (a > 3 ? 3 : a));
                for (var _ = 0; _ < a; _++) {
                    var d = r;
                    e == i.DIRECTION_SOUTH && (d = 3 == _ || r);
                    var c = this.createOneWeaCard(e, t[_], d);
                    e == i.DIRECTION_NORTH ? (_ < 3 ? c.setPosition(-(c.width + s.posOffsetX) * _, 0) : c.setPosition(1 * -(c.width + s.posOffsetX), 10),
                    c.zIndex = _) : e == i.DIRECTION_WEST ? _ < 3 ? (c.setPosition(0, -(c.height + s.posOffsetY) * _),
                    c.zIndex = _) : (c.setPosition(0, 1 * -(c.height + s.posOffsetY) + 14),
                    c.zIndex = 10) : e == i.DIRECTION_SOUTH ? (_ < 3 ? c.setPosition((c.width + s.posOffsetX) * _, 0) : c.setPosition(1 * (c.width + s.posOffsetX), 24),
                    c.zIndex = _) : e == i.DIRECTION_EAST && (_ < 3 ? (c.setPosition(0, (c.height + s.posOffsetY) * _),
                    c.zIndex = 10 - _) : (c.setPosition(0, 1 * (c.height + s.posOffsetY) + 14),
                    c.zIndex = 10)),
                    o.addChild(c)
                }
                return o
            },
            createGameEndHandCardSpr: function(e, t) {
                var a = new cc.Node
                  , i = a.addComponent(cc.Sprite)
                  , s = n.getWeaveCardConfig(e);
                if (e == o.DIRECTION_NORTH ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_S"),
                a._resName = "WeaCard_S",
                a._anchorPoint = cc.v2(1, 1)) : e == o.DIRECTION_WEST ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W"),
                a._resName = "WeaCard_W",
                a._anchorPoint = cc.v2(0, 1)) : e == o.DIRECTION_SOUTH ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_S"),
                a._resName = "WeaCard_S",
                a._anchorPoint = cc.v2(0, 0),
                a.setScale(1.2)) : e == o.DIRECTION_EAST && (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W"),
                a._resName = "WeaCard_W",
                a._anchorPoint = cc.v2(1, 0)),
                i.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                a.width = s.size.width,
                a.height = s.size.height,
                1 == r.isValidCard(t)) {
                    var _ = this.createHandCardFont(t);
                    a.addChild(_)
                }
                return a
            },
            createSpriteFrame: function(e) {
                return this._CardBackAtlas.getSpriteFrame(e)
            }
        }),
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        ResBase: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuGameConfig: "sparrowpinghuGameConfig",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }],
    sparrowpinghuCreaterRoom: [function(e, t) {
        "use strict";
        cc._RF.push(t, "07a6bHfFbFNmJ4VwW8rhJFN", "sparrowpinghuCreaterRoom");
        var a, i = e("ResBase"), r = e("sparrowpinghuGameLogic"), o = e("GlobalFunction"), n = e("GlobalDefine");
        cc.Class({
            extends: i,
            gameRule: function() {
                this.arr = new Array,
                this.arr[0] = {
                    type: 1,
                    title: "\u5c40\u6570",
                    rule: {
                        0: {
                            ruleStr: "4\u5c40",
                            code: 128,
                            default: !1
                        },
                        1: {
                            ruleStr: "8\u5c40",
                            code: 256,
                            default: !0
                        },
                        2: {
                            ruleStr: "16\u5c40",
                            code: 512,
                            default: !1
                        },
                        3: {
                            ruleStr: "2\u5708",
                            code: 2048,
                            default: !1
                        },
                        length: 4
                    }
                },
                this.arr[1] = {
                    type: 1,
                    title: "\u4eba\u6570",
                    rule: {
                        0: {
                            ruleStr: "2\u4eba",
                            code: 131072,
                            default: !1
                        },
                        1: {
                            ruleStr: "3\u4eba",
                            code: 262144,
                            default: !1
                        },
                        2: {
                            ruleStr: "4\u4eba",
                            code: 524288,
                            default: !0
                        },
                        length: 3
                    }
                },
                this.arr[2] = {
                    type: 1,
                    title: "\u6251\u5206",
                    rule: {
                        0: {
                            ruleStr: "\u62510\u5206",
                            code: 64,
                            default: !0
                        },
                        1: {
                            ruleStr: "\u62511\u5206",
                            code: 2097152,
                            default: !1
                        },
                        2: {
                            ruleStr: "\u62512\u5206",
                            code: 4194304,
                            default: !1
                        },
                        3: {
                            ruleStr: "\u62513\u5206",
                            code: 8388608,
                            default: !1
                        },
                        4: {
                            ruleStr: "\u62514\u5206",
                            code: 16777216,
                            default: !1
                        },
                        5: {
                            ruleStr: "\u62515\u5206",
                            code: 33554432,
                            default: !1
                        },
                        length: 6
                    }
                },
                this.arr[3] = {
                    type: 1,
                    title: "\u8e22\u4eba",
                    rule: {
                        0: {
                            ruleStr: "5\u79d2\u79bb\u7ebf",
                            code: 8192,
                            default: !1
                        },
                        1: {
                            ruleStr: "20\u79d2\u79bb\u7ebf",
                            code: 16384,
                            default: !1
                        },
                        2: {
                            ruleStr: "60\u79d2\u79bb\u7ebf",
                            code: 32768,
                            default: !0
                        },
                        3: {
                            ruleStr: "600\u79d2\u79bb\u7ebf",
                            code: 65536,
                            default: !1
                        },
                        length: 4
                    }
                },
                this.arr[4] = {
                    type: 1,
                    title: "\u51c6\u5907",
                    rule: {
                        0: {
                            ruleStr: "\u624b\u52a8\u51c6\u5907",
                            code: n.GAME_RULE_MANNUAL_READY,
                            default: !1
                        },
                        1: {
                            ruleStr: "\u81ea\u52a8\u51c6\u5907 0\u79d2",
                            code: n.GAME_RULE_AUTOREADY_TIME_0S,
                            default: !1
                        },
                        2: {
                            ruleStr: "\u81ea\u52a8\u51c6\u5907 5\u79d2",
                            code: n.GAME_RULE_AUTOREADY_TIME_5S,
                            default: !0
                        },
                        3: {
                            ruleStr: "\u81ea\u52a8\u51c6\u5907 10\u79d2",
                            code: n.GAME_RULE_AUTOREADY_TIME_10S,
                            default: !1
                        },
                        length: 4
                    }
                },
                this.arr[5] = {
                    type: 2,
                    title: "\u73a9\u6cd5",
                    rule: {
                        0: {
                            ruleStr: "\u4e00\u70ae\u591a\u54cd",
                            code: 1,
                            default: !0
                        },
                        1: {
                            ruleStr: "\u4e00\u6761\u9f99",
                            code: 2,
                            default: !0
                        },
                        2: {
                            ruleStr: "\u6e05\u4e00\u8272",
                            code: 4,
                            default: !1
                        },
                        3: {
                            ruleStr: "\u4eae\u559c",
                            code: 8,
                            default: !0
                        },
                        4: {
                            ruleStr: "\u5403\u724c",
                            code: 16,
                            default: !1
                        },
                        5: {
                            ruleStr: "\u9ec4\u5e84\u9ec4\u6760",
                            code: 32,
                            default: !1
                        },
                        6: {
                            ruleStr: "\u4e2d\u53d1\u767d\u7b97\u4ed8",
                            code: 1048576,
                            default: !1
                        },
                        7: {
                            ruleStr: "AA\u5236\u6263\u5361",
                            code: 67108864,
                            default: !1
                        },
                        8: {
                            ruleStr: "\u7981\u6b62\u73a9\u5bb6\u89e3\u6563",
                            code: 4503599627370496,
                            default: !1
                        },
                        9: {
                            ruleStr: "\u62a5\u542c",
                            code: r.GAME_RULE.GAME_RULE_BAO_TING,
                            default: !1
                        },
                        10: {
                            ruleStr: "\u76f4\u6760\u5fc5\u6760",
                            code: r.GAME_RULE.GAME_RULE_ZHIGANG_BIGANG,
                            default: !1
                        },
                        11: {
                            ruleStr: "\u8fc7\u5708\u80e1",
                            code: 1073741824,
                            default: !1
                        },
                        12: {
                            ruleStr: "GPS\u9632\u4f5c\u5f0a",
                            code: r.GAME_RULE.GAME_TYPE_NO_GPS_NO_IN,
                            default: !1
                        },
                        length: 13
                    }
                },
                this.arr[6] = {
                    type: 2,
                    title: "\u9ad8\u7ea7",
                    rule: {
                        0: {
                            ruleStr: "\u7d2f\u8ba1\u62d6\u5ef65\u5206\u949f\u89e3\u6563",
                            code: r.GAME_RULE.GAME_TYPE_NO_OUTCARD5_JIE_SAN,
                            default: !1
                        },
                        length: 1
                    }
                },
                this.arr[7] = {
                    type: 1,
                    title: "\u9996\u5c40\u6263\u5206",
                    rule: {
                        0: {
                            ruleStr: "\u4e0d\u9996\u6263",
                            code: r.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_0_SCORE,
                            default: !0
                        },
                        1: {
                            ruleStr: "\u9996\u62631",
                            code: r.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_1_SCORE,
                            default: !1
                        },
                        2: {
                            ruleStr: "\u9996\u62632",
                            code: r.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_2_SCORE,
                            default: !1
                        },
                        length: 3
                    }
                },
                this.arr[8] = {
                    type: 1,
                    title: "\u6b63\u5e38\u6263\u5206",
                    rule: {
                        0: {
                            ruleStr: "\u4e0d\u6263",
                            code: r.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_0_SCORE,
                            default: !0
                        },
                        1: {
                            ruleStr: "\u62631",
                            code: r.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_1_SCORE,
                            default: !1
                        },
                        2: {
                            ruleStr: "\u62632",
                            code: r.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_2_SCORE,
                            default: !1
                        },
                        length: 3
                    }
                },
                this.ruleList = this.arr
            },
            start: function(e) {
                (a = this)._parent = e,
                this.gameRule()
            },
            getNeedDealIndex: function() {
                return null
            },
            callback: function(e) {
                a.resetSiggleDefaultValue(e.node.name),
                e.isChecked ? window.YC.UserDefault.setKey(e.node.name, e.node.name, 10801) : window.YC.UserDefault.setKey(e.node.name, "", 10801),
                cc.log("\u70b9\u51fb\u89c4\u5219\uff1a" + e.node.name + e.node._code),
                a.freshRule(e),
                a._parent.refreshRoomCard(),
                a._parent.onGameRuleChanged()
            },
            jinzhirule: function() {
                var e = a._ruleContent._children[5].getChildByName("toggleContainer")._children;
                0 != a._parent._dwGroupID ? (e[8].getComponent(cc.Toggle).interactable = !0,
                e[8].getChildByName("label").color = new cc.color(77,125,173)) : (e[8].getComponent(cc.Toggle).isChecked = !1,
                e[8].getComponent(cc.Toggle).interactable = !1,
                e[8].getChildByName("label").color = new cc.color(163,153,141))
            },
            freshRule: function(e) {
                if ("\u4eba\u6570" == e.node._pNode) {
                    "2\u4eba" == e.node.name ? a.arr[0].rule = {
                        0: {
                            ruleStr: "4\u5c40",
                            code: 128,
                            default: !1
                        },
                        1: {
                            ruleStr: "8\u5c40",
                            code: 256,
                            default: !0
                        },
                        2: {
                            ruleStr: "16\u5c40",
                            code: 512,
                            default: !1
                        },
                        3: {
                            ruleStr: "2\u5708",
                            code: 2048,
                            default: !1
                        },
                        length: 4
                    } : "3\u4eba" == e.node.name ? a.arr[0].rule = {
                        0: {
                            ruleStr: "4\u5c40",
                            code: 128,
                            default: !1
                        },
                        1: {
                            ruleStr: "8\u5c40",
                            code: 256,
                            default: !0
                        },
                        2: {
                            ruleStr: "16\u5c40",
                            code: 512,
                            default: !1
                        },
                        3: {
                            ruleStr: "2\u5708",
                            code: 2048,
                            default: !1
                        },
                        length: 4
                    } : "4\u4eba" == e.node.name && (a.arr[0].rule = {
                        0: {
                            ruleStr: "1\u5708",
                            code: 1024,
                            default: !1
                        },
                        1: {
                            ruleStr: "2\u5708",
                            code: 2048,
                            default: !0
                        },
                        2: {
                            ruleStr: "4\u5708",
                            code: 4096,
                            default: !1
                        },
                        3: {
                            ruleStr: "8\u5c40",
                            code: 256,
                            default: !1
                        },
                        length: 4
                    });
                    for (var t = a._ruleContent.getChildByName("\u5c40\u6570").getChildByName("toggleContainer")._children, i = 0; i < a.arr[0].rule.length; i++)
                        t[i]._name = a.arr[0].rule[i].ruleStr,
                        t[i]._code = a.arr[0].rule[i].code,
                        t[i].getChildByName("label").getComponent(cc.Label).string = a.arr[0].rule[i].ruleStr,
                        window.YC.UserDefault.getKey(t[i]._name, "", 10801) == t[i]._name ? t[i].getComponent(cc.Toggle).isChecked = !0 : t[i].getComponent(cc.Toggle).isChecked = !1
                }
            },
            resetSiggleDefaultValue: function(e) {
                for (var t = 0; t < this.ruleList.length; t++)
                    for (var a = 0; a < this.ruleList[t].rule.length; a++) {
                        var i = this.ruleList[t].rule;
                        if (e == i[a].ruleStr && 1 == this.ruleList[t].type)
                            for (var r = 0; r < i.length; r++)
                                window.YC.UserDefault.setKey(i[r].ruleStr, "", 10801)
                    }
            },
            setRuleNodeView: function(e, t) {
                a._ruleContent = e;
                for (var i = a._ruleContent._children, r = 0; r < i.length; r++)
                    if ("\u4eba\u6570" == i[r]._name) {
                        for (var n = i[r]._children[1]._children, s = 0; s < n.length; s++)
                            if (1 == n[s]._components[0].isChecked) {
                                a.freshRule(n[s]._components[0]);
                                break
                            }
                        break
                    }
                for (var _ = 0; _ < i.length; _++)
                    if ("\u5c40\u6570" == i[_]._name) {
                        n = i[_]._children[1]._children;
                        for (var d = 0; d < n.length; d++)
                            o._and(t, n[d]._code) ? n[d].getComponent(cc.Toggle).isChecked = !0 : n[d].getComponent(cc.Toggle).isChecked = !1;
                        break
                    }
            },
            setRuleNode: function(e) {
                a._ruleContent = e;
                for (var t = a._ruleContent._children, i = 0; i < t.length; i++)
                    for (var r = t[i]._children[1]._children, o = 0; o < r.length; o++)
                        1 == r[o]._components[0].isChecked && (window.YC.UserDefault.setKey(r[o]._components[0].node.name, r[o]._components[0].node.name, 10801),
                        a.freshRule(r[o]._components[0]))
            },
            getMaxPlayCount: function() {
                if (!a._ruleContent)
                    return 0;
                for (var e = a._ruleContent.getChildByName("\u5c40\u6570")._children[1]._children, t = 0; t < e.length; t++)
                    if (1 == e[t]._components[0].isChecked)
                        switch (cc.log("\u9009\u4e2d\u5c40\u6570" + e[t]._name),
                        e[t]._name) {
                        case "4\u5c40":
                            return 4;
                        case "8\u5c40":
                            return 8;
                        case "16\u5c40":
                            return 16;
                        case "1\u5708":
                            return 4;
                        case "2\u5708":
                            return 8;
                        case "4\u5708":
                            return 16
                        }
            },
            getGetChairCount: function() {
                if (!a._ruleContent)
                    return 0;
                for (var e = a._ruleContent.getChildByName("\u4eba\u6570")._children[1]._children, t = 0; t < e.length; t++)
                    if (1 == e[t]._components[0].isChecked)
                        switch (cc.log("\u9009\u4e2d\u4eba\u6570" + e[t]._name),
                        e[t]._name) {
                        case "2\u4eba":
                            return 2;
                        case "3\u4eba":
                            return 3;
                        case "4\u4eba":
                            return 4
                        }
            },
            getRules: function() {
                for (var e = new LongLong(0,0,!1), t = a._ruleContent._children, i = 0; i < t.length; i++)
                    for (var r = t[i]._children[1]._children, n = 0; n < r.length; n++)
                        1 == r[n]._components[0].isChecked && (e = o._or(e, r[n]._code),
                        cc.log(t[i]._name + ":" + r[n]._name + r[n]._code));
                return cc.log("_llcode:" + e),
                e
            },
            getGameRulesStr: function(e) {
                for (var t = new Array, a = r.GAME_RULE_str.length, i = 0; i < a; i++)
                    0 == e.and(r.GAME_RULE_str[i]._code).isZero() && (t[t.length] = r.GAME_RULE_str[i]._str);
                return t
            },
            getGameRulesStrShare: function(e) {
                for (var t = new Array, a = r.GAME_RULE_str_share.length, i = 0; i < a; i++)
                    0 == e.and(r.GAME_RULE_str_share[i]._code).isZero() && (t[t.length] = r.GAME_RULE_str_share[i]._str);
                return t
            },
            setEnabledAA: function(e) {
                var t = a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361");
                if (e)
                    t.getComponent(cc.Toggle).uncheck();
                else {
                    var i = window.YC.UserDefault.getKey("AA\u5236\u6263\u5361", "", 10801);
                    null == i || "" == i ? t.getComponent(cc.Toggle).uncheck() : t.getComponent(cc.Toggle).check()
                }
                t.active = !e,
                this.jinzhirule()
            },
            isSelectAA: function() {
                return !!a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked
            },
            getKindID: function() {
                var e = this.getGetChairCount();
                return 4 == e ? "10801" : 3 == e ? "10803" : 2 == e ? "10802" : void 0
            },
            getNeedRoomCard: function() {
                var e = 0
                  , t = this.getGetChairCount()
                  , i = this.getMaxPlayCount();
                return 4 == t ? 4 == i ? (e = 4,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : 8 == i ? (e = 4,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : (e = 8,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 2)) : 3 == t ? 4 == i ? (e = 3,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : 8 == i ? (e = 3,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : (e = 6,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 2)) : 2 == t && (4 == i ? (e = 2,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : 8 == i ? (e = 2,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 1)) : (e = 4,
                a._ruleContent.getChildByName("\u73a9\u6cd5")._children[1].getChildByName("AA\u5236\u6263\u5361").getComponent(cc.Toggle).isChecked && (e = 2))),
                e
            },
            buildRuleTeamplateByRule: function(e) {
                for (var t = a._ruleContent._children, i = 0; i < t.length; i++)
                    if ("\u4eba\u6570" == t[i].name)
                        for (var r = t[i]._children[1]._children, n = 0; n < r.length; n++)
                            if (o._and(e, r[n]._code))
                                return r[n]._components[0].isChecked = !0,
                                void this.freshRule(r[n]._components[0])
            },
            loadRule: function(e) {
                for (var t = a._ruleContent._children, i = 0; i < t.length; i++)
                    for (var r = t[i]._children[1]._children, n = 0; n < r.length; n++)
                        o._and(e, r[n]._code) && (r[n]._components[0].isChecked = !0)
            }
        }),
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        ResBase: void 0,
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }],
    sparrowpinghuDefine: [function(e, t) {
        "use strict";
        cc._RF.push(t, "ffcc0IcXY5F/KEKaheLbF71", "sparrowpinghuDefine"),
        cc._RF.pop()
    }
    , {}],
    sparrowpinghuGameConfig: [function(e, t) {
        "use strict";
        cc._RF.push(t, "9861efUfsBHsJxhveCROeys", "sparrowpinghuGameConfig");
        var a = e("GlobalDefine")
          , i = e("sparrowpinghuCMD")
          , r = {
            curCardFontSize: void 0,
            setCardFontSize: function(e) {
                r.curCardFontSize = e
            },
            setCardBackColor: function(e) {
                r.curCardBackColor = e
            },
            getRecordHandCardNodePos: function(e) {
                if (null != r.curCardFontSize) {
                    var t = new Array;
                    return r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? (t[i.DIRECTION_NORTH] = cc.v2(-250, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-530, -120),
                    t[i.DIRECTION_SOUTH] = cc.v2(480, -370),
                    t[i.DIRECTION_EAST] = cc.v2(530, 230)) : (t[i.DIRECTION_NORTH] = cc.v2(-250, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-510, -120),
                    t[i.DIRECTION_SOUTH] = cc.v2(515, -355),
                    t[i.DIRECTION_EAST] = cc.v2(510, 230)),
                    null != e ? t[e] : t
                }
                cc.error("getHandCardNodePos error curCardFontSize == undefined")
            },
            getHandCardNodePos: function(e) {
                if (null != r.curCardFontSize) {
                    var t = new Array;
                    return r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? (t[i.DIRECTION_NORTH] = cc.v2(-250, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-510, -100),
                    t[i.DIRECTION_SOUTH] = cc.v2(480, -370),
                    t[i.DIRECTION_EAST] = cc.v2(510, 200)) : (t[i.DIRECTION_NORTH] = cc.v2(-250, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-510, -100),
                    t[i.DIRECTION_SOUTH] = cc.v2(515, -355),
                    t[i.DIRECTION_EAST] = cc.v2(510, 200)),
                    null != e ? t[e] : t
                }
                cc.error("getHandCardNodePos error curCardFontSize == undefined")
            },
            getWeaveCardNodePos: function(e) {
                if (null != r.curCardFontSize) {
                    var t = new Array;
                    return r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? (t[i.DIRECTION_NORTH] = cc.v2(300, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-470, 250),
                    t[i.DIRECTION_SOUTH] = cc.v2(-630, -360),
                    t[i.DIRECTION_EAST] = cc.v2(470, -165)) : (t[i.DIRECTION_NORTH] = cc.v2(300, 350),
                    t[i.DIRECTION_WEST] = cc.v2(-470, 250),
                    t[i.DIRECTION_SOUTH] = cc.v2(-610, -350),
                    t[i.DIRECTION_EAST] = cc.v2(470, -165)),
                    null != e ? t[e] : t
                }
                cc.error("getWeaveCardNodePos error curCardFontSize == undefined")
            },
            getRecordHandCardConfig: function(e) {
                if (null != r.curCardFontSize) {
                    var t = cc.winSize;
                    cc.log("getHandCardConfig" + t.width + ":" + t.height);
                    var i = cc.view.getVisibleSize();
                    cc.log("vVisibleSize" + i.width + ":" + i.height);
                    var o = cc.view.getDesignResolutionSize();
                    cc.log("ResolutionSize" + o.width + ":" + o.height);
                    var n = cc.view.isRetinaEnabled();
                    cc.log("bRetinaEnabled " + n);
                    var s = cc.view.getCanvasSize();
                    cc.log("CanvasSize " + s);
                    var _;
                    return _ = r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? [{
                        size: {
                            width: 40,
                            height: 60
                        },
                        posOffsetX: -2,
                        weaveSpace: 15,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: .41,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -5
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 40,
                        posOffsetY: -13,
                        fontScale: .39,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -8
                    }, {
                        size: {
                            width: 92.4,
                            height: 147.4
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: .98,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -10
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 40,
                        posOffsetY: -13,
                        fontScale: .39,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 8
                    }] : [{
                        size: {
                            width: 40,
                            height: 60
                        },
                        posOffsetX: -2,
                        weaveSpace: 20,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: .45,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -5
                    }, {
                        size: {
                            width: 52.5,
                            height: 63
                        },
                        posOffsetX: 0,
                        weaveSpace: 20,
                        sendCardSpace: 40,
                        posOffsetY: -30,
                        fontScale: .5,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -15
                    }, {
                        size: {
                            width: 90,
                            height: 129
                        },
                        posOffsetX: -2,
                        weaveSpace: 50,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -10
                    }, {
                        size: {
                            width: 52.5,
                            height: 65
                        },
                        posOffsetX: 0,
                        weaveSpace: 20,
                        sendCardSpace: 40,
                        posOffsetY: -30,
                        fontScale: .45,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 15
                    }],
                    null != e ? (cc.log(_[e]),
                    _[e]) : _
                }
                cc.error("getHandCardInfo error curCardFontSize == undefined")
            },
            getHandCardConfig: function(e) {
                if (null != r.curCardFontSize) {
                    var t = cc.winSize;
                    cc.log("getHandCardConfig" + t.width + ":" + t.height);
                    var i = cc.view.getVisibleSize();
                    cc.log("vVisibleSize" + i.width + ":" + i.height);
                    var o = cc.view.getDesignResolutionSize();
                    cc.log("ResolutionSize" + o.width + ":" + o.height);
                    var n = cc.view.isRetinaEnabled();
                    cc.log("bRetinaEnabled " + n);
                    var s = cc.view.getCanvasSize();
                    cc.log("CanvasSize " + s);
                    var _;
                    return _ = r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? [{
                        size: {
                            width: 40,
                            height: 60
                        },
                        posOffsetX: -2,
                        weaveSpace: 15,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }, {
                        size: {
                            width: 32,
                            height: 67
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 40,
                        posOffsetY: -41,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }, {
                        size: {
                            width: 92.4,
                            height: 147.4
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: .98,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -10
                    }, {
                        size: {
                            width: 32,
                            height: 67
                        },
                        posOffsetX: 0,
                        weaveSpace: 15,
                        sendCardSpace: 40,
                        posOffsetY: -41,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }] : [{
                        size: {
                            width: 40,
                            height: 60
                        },
                        posOffsetX: -2,
                        weaveSpace: 20,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }, {
                        size: {
                            width: 22,
                            height: 56
                        },
                        posOffsetX: 0,
                        weaveSpace: 20,
                        sendCardSpace: 40,
                        posOffsetY: -30,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }, {
                        size: {
                            width: 90,
                            height: 129
                        },
                        posOffsetX: -2,
                        weaveSpace: 50,
                        sendCardSpace: 20,
                        posOffsetY: 0,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: -10
                    }, {
                        size: {
                            width: 22,
                            height: 56
                        },
                        posOffsetX: 0,
                        weaveSpace: 20,
                        sendCardSpace: 40,
                        posOffsetY: -30,
                        fontScale: 1,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 0
                    }],
                    null != e ? (cc.log(_[e]),
                    _[e]) : _
                }
                cc.error("getHandCardInfo error curCardFontSize == undefined")
            },
            getDisCardConfig: function(e) {
                if (null != r.curCardFontSize) {
                    var t;
                    return t = r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? [{
                        size: {
                            width: 50,
                            height: 77
                        },
                        posOffsetX: -1,
                        posOffsetY: 0,
                        lineHeight: 62,
                        fontScale: .5,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 67,
                            height: 53
                        },
                        posOffsetX: 0,
                        posOffsetY: -27,
                        lineHeight: 66,
                        fontScale: .46,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 50,
                            height: 77
                        },
                        posOffsetX: -1,
                        posOffsetY: 0,
                        lineHeight: 62,
                        fontScale: .5,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 67,
                            height: 53
                        },
                        posOffsetX: 0,
                        posOffsetY: -27,
                        lineHeight: 66,
                        fontScale: .46,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }] : [{
                        size: {
                            width: 51,
                            height: 75.75
                        },
                        posOffsetX: 1,
                        posOffsetY: 0,
                        lineHeight: 55.75,
                        fontScale: .55,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 70,
                            height: 63
                        },
                        posOffsetX: 0,
                        posOffsetY: -27,
                        lineHeight: 66,
                        fontScale: .52,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 10
                    }, {
                        size: {
                            width: 51,
                            height: 75.75
                        },
                        posOffsetX: 1,
                        posOffsetY: 0,
                        lineHeight: 62,
                        fontScale: .55,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 70,
                            height: 63
                        },
                        posOffsetX: 0,
                        posOffsetY: -27,
                        lineHeight: 66,
                        fontScale: .52,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 10
                    }],
                    null != e ? t[e] : t
                }
                cc.error("getDisCardConfig error curCardFontSize == undefined")
            },
            getWeaveCardConfig: function(e) {
                if (null != r.curCardFontSize) {
                    var t;
                    return t = r.curCardFontSize == a.GameOptionResult.BIG || r.curCardFontSize == a.GameOptionResult.MIDDLE ? [{
                        size: {
                            width: 37.4,
                            height: 55.55
                        },
                        weaveSpace: 10,
                        posOffsetX: -1,
                        posOffsetY: 0,
                        fontScale: .34,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 3.5
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        weaveSpace: -20,
                        posOffsetX: 0,
                        posOffsetY: -13,
                        fontScale: .4,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }, {
                        size: {
                            width: 72,
                            height: 110
                        },
                        weaveSpace: 10,
                        posOffsetX: -1,
                        posOffsetY: 0,
                        fontScale: .7,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 10
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        weaveSpace: -20,
                        posOffsetX: 0,
                        posOffsetY: -13,
                        fontScale: .36,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }] : [{
                        size: {
                            width: 37.4,
                            height: 55.55
                        },
                        weaveSpace: 10,
                        posOffsetX: 0,
                        posOffsetY: 0,
                        fontScale: .4,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 6.5
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        weaveSpace: -25,
                        posOffsetX: 0,
                        posOffsetY: -15,
                        fontScale: .4,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 8
                    }, {
                        size: {
                            width: 68,
                            height: 101
                        },
                        weaveSpace: 40,
                        posOffsetX: 0,
                        posOffsetY: 0,
                        fontScale: .75,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 10
                    }, {
                        size: {
                            width: 52.5,
                            height: 47.25
                        },
                        weaveSpace: -25,
                        posOffsetX: 0,
                        posOffsetY: -15,
                        fontScale: .4,
                        fontPosOffsetX: 0,
                        fontPosOffsetY: 7
                    }],
                    null != e ? t[e] : t
                }
                cc.error("getWeaveCardConfig error curCardFontSize == undefined")
            }
        };
        t.exports = {
            cardConfig: r
        },
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD"
    }],
    sparrowpinghuGameLogic: [function(e, t) {
        "use strict";
        cc._RF.push(t, "9fc78IaJ/FA3Y9COYWeP+6C", "sparrowpinghuGameLogic");
        var a = e("sparrowpinghuCMD")
          , i = function() {}
          , r = e("GlobalDefine")
          , o = e("GlobalFunction");
        i.PLAC = cc.Enum({
            ACTOIN_1: 1,
            ACTOIN_2: 2,
            ACTOIN_WAIT: 3,
            ACTOIN_STOP: 4
        }),
        i.ENLARGE_AC = cc.Enum({
            ACTOIN_SHOW: 1,
            ACTOIN_WAIT_HIDE: 2,
            ACTOIN_HIDEING: 3,
            ACTOIN_STOP: 4
        }),
        i.PARM = cc.Enum({
            WIK_GANERAL: 0,
            WIK_MING_GANG: 1,
            WIK_FANG_GANG: 2,
            WIK_AN_GANG: 3,
            WIK_DIRECTION_GANG: 4,
            WIK_ZFB_GANG: 5
        }),
        i.WIK = cc.Enum({
            WIK_NULL: 0,
            WIK_LEFT: 1,
            WIK_CENTER: 2,
            WIK_RIGHT: 4,
            WIK_PENG: 8,
            WIK_GANG: 16,
            WIK_LIANG_XI: 32,
            WIK_CHI_HU: 64,
            WIK_ZI_MO: 128,
            WIK_DIAN_PAO: 256,
            WIK_LISTEN: 512
        }),
        i.CHR = cc.Enum({
            CHR_PING_HU: 2,
            CHR_JIA: 4,
            CHR_XIAO_PIAO: 8,
            CHR_QI_XIAO_DUI: 16,
            CHR_HAO_HUA_QI_XIAO_DUI: 32,
            CHR_CHAO_HAO_HUA_QI_XIAO_DUI: 64,
            CHR_CHAO_CHAO_HAO_HUA_QI_DUI: 16384,
            CHR_YI_TIAO_LONG: 128,
            CHR_GANG_KAI: 256,
            CHR_GANG_LIU_LEI: 512,
            CHR_QIANG_GANG_HU: 1024,
            CHR_QING_YI_SE: 2048,
            CHR_LIANG_XI: 4096,
            CHR_ZI_MO: 8192
        }),
        i.GAME_RULE = cc.Enum({
            GAME_TYPE_2: 131072,
            GAME_TYPE_3: 262144,
            GAME_TYPE_4: 524288,
            GAME_TYPE_JUSHU_10: 128,
            GAME_TYPE_JUSHU_20: 256,
            GAME_TYPE_JUSHU_12: 512,
            GAME_TYPE_QUAN_1: 1024,
            GAME_TYPE_QUAN_2: 2048,
            GAME_TYPE_QUAN_4: 4096,
            GAME_TYPE_PU_0: 64,
            GAME_TYPE_PU_1: 2097152,
            GAME_TYPE_PU_2: 4194304,
            GAME_TYPE_PU_3: 8388608,
            GAME_TYPE_PU_4: 16777216,
            GAME_TYPE_PU_5: 33554432,
            GAME_TYPE_5MIAO_KICK: 8192,
            GAME_TYPE_20MIAO_KICK: 16384,
            GAME_TYPE_60MIAO_KICK: 32768,
            GAME_TYPE_600MIAO_KICK: 65536,
            GAME_TYPE_ZHUANG_JIAFAN: 1,
            GAME_TYPE_MEN_JIAFAN: 2,
            CR_QING_YI_SE: 4,
            GAME_TYPE_XUAN_FENG_GANG: 8,
            CR_CHI_PAI: 16,
            CR_HZ_HUANGGANG: 32,
            GAME_TYPE_ZFB_FU: 1048576,
            GAME_TYPE_FANGKA_AA: 67108864,
            GAME_TYPE_KUAI_JIE_YU: 134217728,
            GAME_RULE_JI_ZHI_JIE_SAN: 4503599627370496,
            GAME_RULE_BAO_TING: 268435456,
            GAME_RULE_ZHIGANG_BIGANG: 536870912,
            GAME_RULE_GUO_QUAN_HU: 1073741824,
            GAME_TYPE_NO_OUTCARD5_JIE_SAN: 4294967296,
            GAME_TYPE_NO_GPS_NO_IN: 34359738368,
            GAME_RULE_DELAY_RESPONSIBLE_0_SCORE: 1099511627776,
            GAME_RULE_DELAY_RESPONSIBLE_1_SCORE: 8589934592,
            GAME_RULE_DELAY_RESPONSIBLE_2_SCORE: 2199023255552,
            GAME_RULE_DELAY_RESPONSIBLE_10_SCORE: 9007199254740992,
            GAME_RULE_FIRST_DELAY_RESPONSIBLE_0_SCORE: 17592186044416,
            GAME_RULE_FIRST_DELAY_RESPONSIBLE_1_SCORE: 17179869184,
            GAME_RULE_FIRST_DELAY_RESPONSIBLE_2_SCORE: 4398046511104,
            GAME_RULE_FIRST_DELAY_RESPONSIBLE_10_SCORE: 0x40000000000000
        }),
        (i.GAME_RULE_str = new Array)[0] = {
            _code: 131072,
            _str: "\u5e73\u80e1\u4e8c\u4eba"
        },
        i.GAME_RULE_str[1] = {
            _code: 262144,
            _str: "\u5e73\u80e1\u4e09\u4eba"
        },
        i.GAME_RULE_str[2] = {
            _code: 524288,
            _str: "\u5e73\u80e1\u56db\u4eba"
        },
        i.GAME_RULE_str[3] = {
            _code: 128,
            _str: "4\u5c40"
        },
        i.GAME_RULE_str[4] = {
            _code: 256,
            _str: "8\u5c40"
        },
        i.GAME_RULE_str[5] = {
            _code: 512,
            _str: "16\u5c40"
        },
        i.GAME_RULE_str[6] = {
            _code: 1024,
            _str: "1\u5708"
        },
        i.GAME_RULE_str[7] = {
            _code: 2048,
            _str: "2\u5708"
        },
        i.GAME_RULE_str[8] = {
            _code: 4096,
            _str: "4\u5708"
        },
        i.GAME_RULE_str[9] = {
            _code: 1,
            _str: "\u4e00\u70ae\u591a\u54cd"
        },
        i.GAME_RULE_str[10] = {
            _code: 2,
            _str: "\u4e00\u6761\u9f99"
        },
        i.GAME_RULE_str[11] = {
            _code: 4,
            _str: "\u6e05\u4e00\u8272"
        },
        i.GAME_RULE_str[12] = {
            _code: 8,
            _str: "\u4eae\u559c"
        },
        i.GAME_RULE_str[13] = {
            _code: 16,
            _str: "\u5403\u724c"
        },
        i.GAME_RULE_str[14] = {
            _code: 32,
            _str: "\u9ec4\u5e84\u9ec4\u6760"
        },
        i.GAME_RULE_str[15] = {
            _code: 67108864,
            _str: "\u623f\u5361AA"
        },
        i.GAME_RULE_str[16] = {
            _code: 134217728,
            _str: "\u5feb\u6377\u77ed\u8bed"
        },
        i.GAME_RULE_str[17] = {
            _code: 4503599627370496,
            _str: "\u7981\u6b62\u73a9\u5bb6\u89e3\u6563"
        },
        i.GAME_RULE_str[18] = {
            _code: i.GAME_RULE.GAME_RULE_BAO_TING,
            _str: "\u62a5\u542c"
        },
        i.GAME_RULE_str[19] = {
            _code: i.GAME_RULE.GAME_RULE_ZHIGANG_BIGANG,
            _str: "\u76f4\u6760\u5fc5\u6760"
        },
        i.GAME_RULE_str[20] = {
            _code: 1073741824,
            _str: "\u8fc7\u5708\u80e1"
        },
        i.GAME_RULE_str[21] = {
            _code: 1048576,
            _str: "\u4e2d\u53d1\u767d\u7b97\u4ed8"
        },
        i.GAME_RULE_str[22] = {
            _code: 8192,
            _str: "5\u79d2\u79bb\u7ebf\u8e22\u4eba"
        },
        i.GAME_RULE_str[23] = {
            _code: 16384,
            _str: "20\u79d2\u79bb\u7ebf\u8e22\u4eba"
        },
        i.GAME_RULE_str[24] = {
            _code: 32768,
            _str: "60\u79d2\u79bb\u7ebf\u8e22\u4eba"
        },
        i.GAME_RULE_str[25] = {
            _code: 65536,
            _str: "600\u79d2\u79bb\u7ebf\u8e22\u4eba"
        },
        i.GAME_RULE_str[26] = {
            _code: 64,
            _str: "\u62510\u5206"
        },
        i.GAME_RULE_str[27] = {
            _code: 2097152,
            _str: "\u62511\u5206"
        },
        i.GAME_RULE_str[28] = {
            _code: 4194304,
            _str: "\u62512\u5206"
        },
        i.GAME_RULE_str[29] = {
            _code: 8388608,
            _str: "\u62513\u5206"
        },
        i.GAME_RULE_str[30] = {
            _code: 16777216,
            _str: "\u62514\u5206"
        },
        i.GAME_RULE_str[31] = {
            _code: 33554432,
            _str: "\u62515\u5206"
        },
        i.GAME_RULE_str[32] = {
            _code: r.GAME_RULE_MANNUAL_READY,
            _str: "\u624b\u52a8\u51c6\u5907"
        },
        i.GAME_RULE_str[33] = {
            _code: r.GAME_RULE_AUTOREADY_TIME_0S,
            _str: "\u81ea\u52a8\u51c6\u59070\u79d2"
        },
        i.GAME_RULE_str[34] = {
            _code: r.GAME_RULE_AUTOREADY_TIME_5S,
            _str: "\u81ea\u52a8\u51c6\u59075\u79d2"
        },
        i.GAME_RULE_str[35] = {
            _code: r.GAME_RULE_AUTOREADY_TIME_10S,
            _str: "\u81ea\u52a8\u51c6\u590710\u79d2"
        },
        i.GAME_RULE_str[36] = {
            _code: i.GAME_RULE.GAME_TYPE_NO_OUTCARD5_JIE_SAN,
            _str: "\u7d2f\u8ba1\u62d6\u5ef65\u5206\u949f\u89e3\u6563"
        },
        i.GAME_RULE_str[37] = {
            _code: i.GAME_RULE.GAME_TYPE_NO_GPS_NO_IN,
            _str: "GPS\u9632\u4f5c\u5f0a"
        },
        i.GAME_RULE_str[38] = {
            _code: i.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_0_SCORE,
            _str: "\u4e0d\u9996\u6263"
        },
        i.GAME_RULE_str[39] = {
            _code: i.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_1_SCORE,
            _str: "\u9996\u62631"
        },
        i.GAME_RULE_str[40] = {
            _code: i.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_2_SCORE,
            _str: "\u9996\u62632"
        },
        i.GAME_RULE_str[41] = {
            _code: i.GAME_RULE.GAME_RULE_FIRST_DELAY_RESPONSIBLE_10_SCORE,
            _str: "\u9996\u626310"
        },
        i.GAME_RULE_str[42] = {
            _code: i.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_0_SCORE,
            _str: "\u4e0d\u6263"
        },
        i.GAME_RULE_str[43] = {
            _code: i.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_1_SCORE,
            _str: "\u62631"
        },
        i.GAME_RULE_str[44] = {
            _code: i.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_2_SCORE,
            _str: "\u62632"
        },
        i.GAME_RULE_str[45] = {
            _code: i.GAME_RULE.GAME_RULE_DELAY_RESPONSIBLE_10_SCORE,
            _str: "\u626310"
        },
        (i.GAME_RULE_str_share = new Array)[0] = {
            _code: 131072,
            _str: "\u5e73\u80e1\u4e8c\u4eba"
        },
        i.GAME_RULE_str_share[1] = {
            _code: 262144,
            _str: "\u5e73\u80e1\u4e09\u4eba"
        },
        i.GAME_RULE_str_share[2] = {
            _code: 524288,
            _str: "\u5e73\u80e1\u56db\u4eba"
        },
        i.GAME_RULE_str_share[3] = {
            _code: 128,
            _str: "4\u5c40"
        },
        i.GAME_RULE_str_share[4] = {
            _code: 256,
            _str: "8\u5c40"
        },
        i.GAME_RULE_str_share[5] = {
            _code: 512,
            _str: "16\u5c40"
        },
        i.GAME_RULE_str_share[6] = {
            _code: 1024,
            _str: "1\u5708"
        },
        i.GAME_RULE_str_share[7] = {
            _code: 2048,
            _str: "2\u5708"
        },
        i.GAME_RULE_str_share[8] = {
            _code: 4096,
            _str: "4\u5708"
        },
        i.LocalCardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 33, 34, 35, 36, 37, 38, 39, 40, 41, 49, 50, 51, 52, 53, 54, 55],
        i.oWeaveItem = cc.Class({
            ctor: function() {
                this._wWeaveKind = 0,
                this._cbPublicCard = 0,
                this._cbParam = 0,
                this._wProvideUser,
                this._cbCardData = new Array,
                this._cbCardCount = 0
            }
        }),
        i.oGangItem = cc.Class({
            ctor: function() {
                this._cbCardData = new Array
            }
        }),
        i.oEatItem = cc.Class({
            ctor: function() {
                this._cbCardData = new Array,
                this._WeaveKing = 0
            }
        }),
        i.SwitchToAllCardIndex = function(e, t) {
            for (var r = new Array(a.MAX_INDEX), o = 0; o < a.MAX_INDEX; o++)
                r[o] = 0;
            for (o = 0; o < t; o++)
                r[i.SwitchToCardIndex(e[o])]++;
            return r
        }
        ,
        i.SwitchToCardIndex = function(e) {
            for (var t = 0; t < i.LocalCardData.length; t++)
                if (i.LocalCardData[t] == e)
                    return t;
            cc.log("The card %d is error!", e)
        }
        ,
        i.SwitchToCardData = function(e) {
            return 0 == i.isValidIndex(e) ? (cc.error("SwitchToCardIndex [%d] is not ValidIndex", e),
            0) : i.LocalCardData[e]
        }
        ,
        i.SortCardList = function(e) {
            if (e instanceof Array == 1) {
                for (var t = 0; t < e.length; t++)
                    for (var a = t + 1; a < e.length; a++)
                        if (e[t] > e[a] && 0 != e[a] || 0 == e[t]) {
                            var i = e[t];
                            e[t] = e[a],
                            e[a] = i
                        }
            } else
                cc.log("SortCardList CardData is not Array")
        }
        ,
        i.isValidCard = function(e) {
            if (null == e)
                return !1;
            var t = i.SwitchToCardIndex(e);
            return i.isValidIndex(t)
        }
        ,
        i.isValidIndex = function(e) {
            return e >= 0 && e < a.MAX_INDEX
        }
        ,
        i.isValidViewId = function(e) {
            return e >= 0 && e < a.GAME_PLAYER
        }
        ,
        i.getEatCardList = function(e, t, a) {
            var r = i.SwitchToAllCardIndex(t, a)
              , o = i.SwitchToCardIndex(e)
              , n = o % 9
              , s = [i.WIK.WIK_LEFT, i.WIK.WIK_CENTER, i.WIK.WIK_RIGHT]
              , _ = new Array;
            if (o >= 28)
                return cc.log("getEatCardList error nCurrentIndex >= 28"),
                _;
            for (var d = 3; d >= 0; d--)
                if (s[d] == i.WIK.WIK_RIGHT && n >= 2)
                    r[o - 1] >= 1 && r[o - 2] >= 1 && ((c = new i.oEatItem)._cbCardData.push(i.SwitchToCardData(o - 2)),
                    c._cbCardData.push(i.SwitchToCardData(o - 1)),
                    c._cbCardData.push(i.SwitchToCardData(o)),
                    c._WeaveKing = i.WIK.WIK_RIGHT,
                    _.push(c));
                else if (s[d] == i.WIK.WIK_CENTER && n >= 1 && n <= 7)
                    r[o - 1] >= 1 && r[o + 1] >= 1 && ((c = new i.oEatItem)._cbCardData.push(i.SwitchToCardData(o - 1)),
                    c._cbCardData.push(i.SwitchToCardData(o)),
                    c._cbCardData.push(i.SwitchToCardData(o + 1)),
                    c._WeaveKing = i.WIK.WIK_CENTER,
                    _.push(c));
                else if (s[d] == i.WIK.WIK_LEFT && n < 7) {
                    var c;
                    r[o + 1] >= 1 && r[o + 2] >= 1 && ((c = new i.oEatItem)._cbCardData.push(i.SwitchToCardData(o)),
                    c._cbCardData.push(i.SwitchToCardData(o + 1)),
                    c._cbCardData.push(i.SwitchToCardData(o + 2)),
                    c._WeaveKing = i.WIK.WIK_LEFT,
                    _.push(c))
                }
            return _
        }
        ,
        i.getGangCardsList = function(e, t, r, o, n, s) {
            for (var _ = new Array, d = i.SwitchToAllCardIndex(r, o), c = 0; c < a.MAX_INDEX; c++)
                4 == d[c] && ((h = new i.oGangItem)._cbCardData.push(i.SwitchToCardData(c)),
                h._cbCardData.push(i.SwitchToCardData(c)),
                h._cbCardData.push(i.SwitchToCardData(c)),
                h._cbCardData.push(i.SwitchToCardData(c)),
                _.push(h));
            for (c = 0; c < t; c++)
                if (e[c]._wWeaveKind == i.WIK.WIK_PENG && 1 == d[i.SwitchToCardIndex(e[c]._cbCardData[0])])
                    if (0 != n[0]) {
                        if (n[0] == e[c]._cbCardData[0] || n[1] == e[c]._cbCardData[0] || n[2] == e[c]._cbCardData[0] || n[3] == e[c]._cbCardData[0])
                            continue;
                        (h = new i.oGangItem)._cbCardData.push(e[c]._cbCardData[0]),
                        h._cbCardData.push(e[c]._cbCardData[0]),
                        h._cbCardData.push(e[c]._cbCardData[0]),
                        _.push(h)
                    } else
                        (h = new i.oGangItem)._cbCardData.push(e[c]._cbCardData[0]),
                        h._cbCardData.push(e[c]._cbCardData[0]),
                        h._cbCardData.push(e[c]._cbCardData[0]),
                        _.push(h);
            if (s) {
                var h;
                for (c = 0; c < t; c++)
                    e[c]._wWeaveKind == i.WIK.WIK_GANG && (e[c]._cbParam,
                    i.PARM.WIK_DIRECTION_GANG),
                    e[c]._wWeaveKind == i.WIK.WIK_GANG && (e[c]._cbParam,
                    i.PARM.WIK_ZFB_GANG);
                0 != d[30] && 0 != d[29] && 0 != d[28] && 0 != d[27] && ((h = new i.oGangItem)._cbCardData.push(i.SwitchToCardData(27)),
                h._cbCardData.push(i.SwitchToCardData(28)),
                h._cbCardData.push(i.SwitchToCardData(29)),
                h._cbCardData.push(i.SwitchToCardData(30)),
                _.push(h)),
                0 != d[31] && 0 != d[32] && 0 != d[33] && ((h = new i.oGangItem)._cbCardData.push(i.SwitchToCardData(31)),
                h._cbCardData.push(i.SwitchToCardData(32)),
                h._cbCardData.push(i.SwitchToCardData(33)),
                _.push(h))
            }
            return _
        }
        ,
        i.getLiangXiCardsList = function(e, t) {
            var a, r = new Array, o = i.SwitchToAllCardIndex(e, t);
            return 0 != o[30] && 0 != o[29] && 0 != o[28] && 0 != o[27] && ((a = new i.oGangItem)._cbCardData.push(i.SwitchToCardData(27)),
            a._cbCardData.push(i.SwitchToCardData(28)),
            a._cbCardData.push(i.SwitchToCardData(29)),
            a._cbCardData.push(i.SwitchToCardData(30)),
            r.push(a)),
            0 != o[31] && 0 != o[32] && 0 != o[33] && ((a = new i.oGangItem)._cbCardData.push(i.SwitchToCardData(31)),
            a._cbCardData.push(i.SwitchToCardData(32)),
            a._cbCardData.push(i.SwitchToCardData(33)),
            r.push(a)),
            r
        }
        ,
        i.createWeaveItem = function(e, t, a, r, o, n) {
            if (e == i.WIK.WIK_LEFT) {
                var s = o[0];
                o[0] = o[1],
                o[1] = s
            } else
                e == i.WIK.WIK_RIGHT && (s = o[2],
                o[2] = o[1],
                o[1] = s);
            var _ = new i.oWeaveItem;
            return _._wWeaveKind = e,
            _._cbParam = t,
            _._cbPublicCard = _._cbParam != i.PARM.WIK_AN_GANG,
            _._wProvideUser = r,
            _._cbCardData = i.copyArray(o),
            _._cbCardCount = n,
            _
        }
        ,
        i.SwitchTingDataToHuData = function(e, t) {
            for (var a = {}, i = e, r = 0; r < i._cbOutCardCount; r++)
                i._cbOutCardData[r] == t && (a._cbHuCardCount = i._cbHuCardCount[r],
                a._cbHuCardData = i._cbHuCardData[r],
                a._cbHuCardRemainingCount = i._cbHuCardRemainingCount[r],
                a._cbHuCardFanCount = i._cbHuCardFanCount[r],
                a._dwChiHuRight = i._dwChiHuRight[r]);
            return a
        }
        ,
        i.getChiHuType = function(e) {
            return e & i.CHR.CHR_QING_YI_SE ? "\u6e05\u4e00\u8272" : e & i.CHR.CHR_YI_TIAO_LONG ? "\u4e00\u6761\u9f99" : e & i.CHR.CHR_CHAO_CHAO_HAO_HUA_QI_DUI ? "\u8d85\u8d85\u8c6a\u534e\u4e03\u5bf9" : e & i.CHR.CHR_CHAO_HAO_HUA_QI_XIAO_DUI ? "\u8d85\u8c6a\u534e\u4e03\u5bf9" : e & i.CHR.CHR_HAO_HUA_QI_XIAO_DUI ? "\u8c6a\u534e\u4e03\u5bf9" : e & i.CHR.CHR_QI_XIAO_DUI ? "\u4e03\u5c0f\u5bf9" : e & i.CHR.CHR_XIAO_PIAO ? "\u98d8\u80e1" : e & i.CHR.CHR_JIA ? "\u5939\u80e1" : "\u5c41\u80e1"
        }
        ,
        i.getChiHuScore = function(e) {
            return e & i.CHR.CHR_QI_XIAO_DUI ? 4 : e & i.CHR.CHR_QING_YI_SE ? 4 : e & i.CHR.CHR_HUN_YI_SE ? 4 : e & i.CHR.CHR_XIAO_PIAO ? 3 : e & i.CHR.CHR_JIA ? 2 : e & i.CHR.CHR_DAN_DIAO ? 2 : e & i.CHR.CHR_BIAN ? 2 : 1
        }
        ,
        i.getBigChiHuType = function(e, t) {
            var a = !1
              , r = 0
              , o = 0
              , n = !0;
            if (1 == e._cbOutCardCount)
                return !1;
            for (var s = 0; s < e._cbHuCardCount[t]; s++)
                i.getChiHuScore(e._cbHuCardData[t][s]) > r && (r = i.getChiHuScore(e._cbHuCardData[t][s]));
            for (s = 0; s < e._cbOutCardCount; s++) {
                for (var _ = 0, d = 0; d < e._cbHuCardCount[s]; d++)
                    i.getChiHuScore(e._cbHuCardData[s][d]) > _ && (_ = i.getChiHuScore(e._cbHuCardData[s][d]));
                r != _ && (n = !1),
                _ >= o && (o = _)
            }
            return r >= o && (a = !0),
            1 != n && a
        }
        ,
        i.getManyChiHuType = function(e, t) {
            var a = !1
              , i = 0
              , r = 0
              , o = !0;
            if (1 == e._cbOutCardCount)
                return !1;
            for (var n = 0; n < e._cbHuCardCount[t]; n++)
                i += e._cbHuCardRemainingCount[t][n];
            for (n = 0; n < e._cbOutCardCount; n++) {
                for (var s = 0, _ = 0; _ < e._cbHuCardCount[n]; _++)
                    s += e._cbHuCardRemainingCount[n][_];
                i != s && (o = !1),
                s >= r && (r = s)
            }
            return i >= r && (a = !0),
            1 != o && a
        }
        ,
        i.getPromptCard = function(e, t) {
            var r = new Array;
            return o._and(e, i.WIK.WIK_LEFT) && ((t & a.MASK_VALUE) <= 7 ? (r.push(t),
            r.push(t + 1),
            r.push(t + 2)) : cc.error("getPromptCard (currentCard_ & CMD.MASK_VALUE )< 7")),
            o._and(e, i.WIK.WIK_CENTER) && ((t & a.MASK_VALUE) < 9 && (t & a.MASK_VALUE) > 1 ? (r.push(t - 1),
            r.push(t),
            r.push(t + 1)) : cc.error("getPromptCard (currentCard_ & CMD.MASK_VALUE )< 9 && (currentCard_ & CMD.MASK_VALUE )> 1")),
            o._and(e, i.WIK.WIK_RIGHT) && ((t & a.MASK_VALUE) >= 2 ? (r.push(t),
            r.push(t - 1),
            r.push(t - 2)) : cc.error("getPromptCard (currentCard_ & CMD.MASK_VALUE )> 2 ")),
            o._and(e, i.WIK.WIK_PENG) && r.push(t),
            o._and(e, i.WIK.WIK_GANG) && r.push(t),
            r
        }
        ,
        i.analyseChiHuRight = function(e, t, a, o, n) {
            var s = "";
            return a == o ? (e & i.CHR.CHR_LIANG_XI && (s += "\u4eae\u559c "),
            e & i.CHR.CHR_XIAO_PIAO ? s += "\u98d8\u80e1 " : e & i.CHR.CHR_YI_TIAO_LONG ? s += "\u4e00\u6761\u9f99 " : e & i.CHR.CHR_JIA ? s += "\u5939\u80e1 " : e & i.CHR.CHR_PING_HU && (s += "\u5c41\u80e1 "),
            e & i.CHR.CHR_QING_YI_SE && (s += "\u6e05\u4e00\u8272 "),
            e & i.CHR.CHR_GANG_KAI && (s += "\u6760\u4e0a\u5f00\u82b1 "),
            e & i.CHR.CHR_QIANG_GANG_HU && (s += "\u62a2\u6760\u80e1 "),
            e & i.CHR.CHR_CHAO_CHAO_HAO_HUA_QI_DUI ? s += "\u8d85\u8d85\u8c6a\u534e\u4e03\u5c0f\u5bf9 " : e & i.CHR.CHR_CHAO_HAO_HUA_QI_XIAO_DUI ? s += "\u8d85\u8c6a\u534e\u4e03\u5c0f\u5bf9 " : e & i.CHR.CHR_HAO_HUA_QI_XIAO_DUI ? s += "\u8c6a\u534e\u4e03\u5c0f\u5bf9 " : e & i.CHR.CHR_QI_XIAO_DUI && (s += "\u4e03\u5c0f\u5bf9 "),
            1 == n && 1 == t._bTing[o] && (s += "\u62a5\u542c ")) : a != r.INVALID_CHAIR && t.wProvideUser == o && (s += "\u70b9\u70ae ",
            e & i.CHR.CHR_GANG_LIU_LEI && (s += "\u6760\u6d41\u6cea ")),
            t.wBankerUser == o && a == r.INVALID_CHAIR && 0 == t.bJieSan && (s += "\u6d41\u5c40 "),
            1 == t.cb_bDianGang[o] && (s += "\u70b9\u6760 "),
            1 == t.cb_bMoGang[o] && (s += "\u6478\u6760 "),
            1 == t.cb_bAnGang[o] && (s += "\u6697\u6760 "),
            1 == t.cb_liangxinum[o] && (s += "\u4eae\u559cX1 "),
            2 == t.cb_liangxinum[o] && (s += "\u4eae\u559cX2 "),
            t.cbPuFen[o] > 0 && (s += "\u6251\u5206" + t.cbPuFen[o]),
            s
        }
        ,
        i.copyArray = function(e) {
            return [].concat(e)
        }
        ,
        i.objectIsNull = function(e) {
            for (var t in e)
                return !1;
            return !0
        }
        ,
        t.exports = i,
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD"
    }],
    sparrowpinghuGameRecord: [function(e, t) {
        "use strict";
        cc._RF.push(t, "8ef58IklHVFPpi3S5PwDTKk", "sparrowpinghuGameRecord");
        var a = e("sparrowpinghuGame")
          , i = e("sparrowpinghuGameLogic")
          , r = e("sparrowpinghuCMD")
          , o = e("GlobalDefine")
          , n = e("GlobalFunction")
          , s = cc.Class({
            extends: a,
            onSubGameStartData: function(e) {
                this._gameView && this._gameView.showGameButtons(0, 0),
                this._nCurrentUser = e._wBankerUser,
                this._nBankerUser = e._wBankerUser,
                this._nFirstBankerUser = e._wFirstBankerUser,
                this._nMaxRoundCount = e._wMaxRoundCount,
                this._nCurrentRound = e._wCurrentRound,
                this._isRecordMode = !0,
                this._LeftCardCount = r.MAX_REPERTORY;
                for (var t = 0; t < r.GAME_PLAYER; t++)
                    i.SortCardList(e._cbCardData[t]),
                    this._nHandCardData[t] = i.copyArray(e._cbCardData[t]),
                    t == this._nCurrentUser ? this._nHandCardCount[t] = r.MAX_COUNT : this._nHandCardCount[t] = r.MAX_COUNT - 1,
                    this._LeftCardCount -= this._nHandCardCount[t];
                var a = this;
                this._gameView && this._gameView.onGameStart(this._nHandCardData, this._nHandCardCount, function() {
                    a._nCurrentUser == a.getMeChairId() && (a._bEnableOutCard = !0),
                    0 != e._cbUserAction && (a._nActionMask = e._cbUserAction,
                    a._nActionCard = 0,
                    a._gameView && a._gameView.showGameButtons(e._cbUserAction))
                })
            },
            addHandCard: function(e, t) {
                if (this._nHandCardCount[e] >= r.MAX_COUNT)
                    return !1;
                for (var a = !1, i = 0; i < r.MAX_COUNT; i++)
                    if (0 == this._nHandCardData[e][i]) {
                        this._nHandCardData[e][i] = t,
                        a = !0;
                        break
                    }
                return 0 != a && (this._nHandCardCount[e]++,
                !0)
            },
            onSubStartPuFenData: function(e) {
                for (var t = 0; t < r.GAME_PLAYER; t++) {
                    var a = n.switchViewChairID(r.GAME_PLAYER, this.getMeChairId(), t);
                    this._gameView && this._gameView.setPlayerPuFen(a, e.cbPuFen[t])
                }
            },
            onSubOutCardData: function(e) {
                if (e._wOutCardUser != window.YC.GC.getPlayer()._wChairID) {
                    this.removeHandCard(e._wOutCardUser, e._cbOutCardData),
                    this._nDiscardCard[e._wOutCardUser][this._nDiscardCount[e._wOutCardUser]++] = e._cbOutCardData;
                    var t = this.getTableUser(e._wOutCardUser)._cbGender;
                    this.playCardDataSound(t, e._cbOutCardData)
                }
                this._nCurrentUser = o.INVALID_CHAIR,
                this._gameView && this._gameView.gameOutCard(e._wOutCardUser, e._cbOutCardData)
            },
            onSubListionOperate: function(e) {
                var t = i.WIK.WIK_LISTEN
                  , a = {};
                a._wOperateCode = t,
                a._wOperateUser = e.wChairID,
                this.onSubOperateResultData(a)
            },
            onSubOperateResultData: function(e) {
                if (e._wOperateCode != i.WIK.WIK_LISTEN) {
                    this._bEnableOutCard = !0,
                    this._nCurrentUser = e._wOperateUser,
                    this._nSendCard = 0,
                    this._nCurrentUser == this.getMeChairId() && (this._oTingData = {},
                    this._oHuData = {});
                    var t = void 0
                      , a = i.createWeaveItem(e._wOperateCode, e._cbOperateParam, e._wOperateUser, e._wProvideUser, e._cbOperateCard, e._cbOperateCardCount);
                    if (a._cbParam != i.PARM.WIK_MING_GANG)
                        t = this._nWeaveCardCount[e._wOperateUser],
                        this._nWeaveCardData[e._wOperateUser][t] = a,
                        this._nWeaveCardCount[e._wOperateUser]++;
                    else
                        for (var o = 0; o < this._nWeaveCardCount[e._wOperateUser]; o++) {
                            var s = this._nWeaveCardData[e._wOperateUser][o];
                            if (s._wWeaveKind == i.WIK.WIK_PENG && s._cbCardData[0] == a._cbCardData[0]) {
                                t = o,
                                this._nWeaveCardData[e._wOperateUser][o] = a;
                                break
                            }
                        }
                    if (e._wOperateCode == i.WIK.WIK_PENG)
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]);
                    else if (e._wOperateCode == i.WIK.WIK_LEFT || e._wOperateCode == i.WIK.WIK_CENTER || e._wOperateCode == i.WIK.WIK_RIGHT)
                        for (o = 0; o < 3; o++)
                            e._cbOperateCard[o] != this._nActionCard && this.removeHandCard(e._wOperateUser, e._cbOperateCard[o]);
                    else
                        e._wOperateCode == i.WIK.WIK_GANG ? a._cbParam == i.PARM.WIK_MING_GANG ? this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]) : a._cbParam == i.PARM.WIK_FANG_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : a._cbParam == i.PARM.WIK_AN_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : a._cbParam == i.PARM.WIK_DIRECTION_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[2]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[3])) : a._cbParam == i.PARM.WIK_ZFB_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[2])) : cc.error("onSubOperateResult error WeaData._cbParam = [%d]", a._cbParam) : e._wOperateCode == i.WIK.WIK_LIANG_XI && (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[2]));
                    e._wOperateUser != e._wProvideUser && (this._gameView._CardLayer.plCardMoveHide(),
                    this._nDiscardCard[e._wProvideUser][--this._nDiscardCount[e._wProvideUser]] = 0),
                    null != this._gameView && (this._gameView.OperateResult(e._wOperateUser, a, t),
                    this._gameView.showOprateFlag(e._wOperateUser, e._wOperateCode))
                } else if (e._wOperateCode == i.WIK.WIK_LISTEN) {
                    var _ = n.switchViewChairID(r.GAME_PLAYER, this.getMeChairId(), e._wOperateUser);
                    this._gameView && this._gameView.setPlayerListen(_, !0),
                    this._gameView && this._gameView.refreshHandCard(this.getMeChairId()),
                    this._gameView && this._gameView.showOprateFlag(e._wOperateUser, e._wOperateCode)
                }
                var d = this.getTableUser(e._wOperateUser)._cbGender;
                this.playActionSound(d, e._wOperateCode)
            },
            removeHandCard: function(e, t) {
                if (e != this._nCurrentUser)
                    return !1;
                if (this._nHandCardCount[e] <= 0)
                    return !1;
                for (var a = !1, r = 0; r < this._nHandCardCount[e]; r++)
                    if (this._nHandCardData[e][r] == t) {
                        this._nHandCardData[e][r] = 0,
                        a = !0;
                        break
                    }
                return i.SortCardList(this._nHandCardData[e]),
                1 == a && (this._nHandCardCount[e]--,
                !0)
            }
        });
        t.exports = s,
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuGame: "sparrowpinghuGame",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }],
    sparrowpinghuGame: [function(e, t) {
        "use strict";
        cc._RF.push(t, "5ee71P/3KFGTpg59bSUP0i4", "sparrowpinghuGame");
        var a = e("sparrowpinghuCMD")
          , i = e("sparrowpinghuGameLogic")
          , r = e("GlobalDefine")
          , o = e("GlobalFunction")
          , n = e("EventDefine")
          , s = a.GameStatus
          , _ = a.GameMessage_S_CMD
          , d = e("sparrowResultLayer")
          , c = e("sparrowBigResultLayer")
          , h = e("AudioManager")
          , C = (e("sparrowpinghuCreaterRoom"),
        e("UIUserInfo"))
          , u = e("GameMode")
          , l = function() {
            u.call(this, "sparrowpinghuGame")
        };
        (l.prototype = new u).init = function() {
            u.prototype.init.apply(this, arguments);
            var e = this.getGameInfo();
            a.setRoomConfig(e._dwKindID),
            this.onInitData();
            var t = this.getGameSetValue(r.GameOptionString.GAME_SOUND_MUTE)
              , i = this.getGameSetValue(r.GameOptionString.GAME_MUSIC)
              , o = this.getGameSetValue(r.GameOptionString.GAME_VOICE);
            h.getAudioComponent().setAudioMute(t != r.GameOptionResult.OFF),
            h.getAudioComponent().setMusicMute(i == r.GameOptionResult.OFF),
            h.getAudioComponent().setEffectMute(o == r.GameOptionResult.OFF),
            this.playBackMusic(),
            window.YC.GC.getTapingManager().setCallback(this)
        }
        ,
        l.prototype.eGameState = cc.Enum({
            GAME_NULL: 65535,
            GAME_FREE: 0,
            GAME_PLAY: 1,
            GAME_PUFEN: 2
        }),
        l.prototype.load = function() {}
        ,
        l.prototype.unload = function() {
            this.onResetData()
        }
        ,
        l.prototype.onEvent = function(e, t) {
            switch (e) {
            case n.EventID.GE_POST_SET_GAMEVIEW:
                switch (t._name) {
                case "changeBackGround":
                    this._gameView && this._gameView.changeBackGround(t._tag);
                    break;
                case "changeCardBack":
                    this.changeCardBack();
                    break;
                case r.GameOptionString.OUT_CARD_ENLARGE:
                    break;
                case r.GameOptionString.CARD_FONT_SIZE:
                    window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u5b57\u5927\u5c0f\u66f4\u6539\u5c06\u5728\u4e0b\u4e00\u5c40\u751f\u6548"),
                    this.changeCardFontSize()
                }
                break;
            case n.EventID.GE_PRI_GAME:
                this.onGameLocalEvent(t);
                break;
            case n.EventID.GE_CHAT_MESSAGE:
                "chat" != t._type && "face" != t._type || this._gameView && this._gameView.startChatBarAction(15);
                break;
            case n.EventID.GE_CHANGE_FULL_SCREEN:
                cc.log("sparrowpinghuGame GE_CHANGE_FULL_SCREEN");
                var a = this
                  , i = 4;
                window.YC.GC.getTimer().add(function e() {
                    cc.log("\u5168\u5c4f\u4e8b\u4ef6 \u5c4f\u5e55\u9002\u914d \u5269\u4f59\u5237\u65b0\u6b21\u6570:" + i),
                    a._gameView && a._gameView.initScreenFit(),
                    a._gameView && a._gameView._CardLayer.initScreenFit(),
                    i > 0 ? i -= 1 : window.YC.GC.getTimer().remove(e)
                }, .5)
            }
        }
        ,
        l.prototype.onGameLocalEvent = function(e) {
            if (null != e && null != e._type)
                switch (e._type) {
                case "ready":
                    this._GameFrame.userReady(),
                    this.onResetData();
                    break;
                case "bigResult":
                    this.onTouchBigResult();
                    break;
                case "backToLobby":
                    window.YC.GC.postEvent(n.EventID.GE_PRI_EXITGAME, null);
                    var t = {};
                    t._type = c,
                    window.YC.GC.postEvent(n.EventID.GE_UI_HIDE, t);
                    break;
                case "showReady":
                    this.getMeItem()._cbUserStatus == r.UserStatus.US_READY || this._bGameEnd ? this._gameView.btnStart.active = !1 : this._gameView.btnStart.active = !0,
                    this._gameView.btnCurrentResult.active = !0;
                    break;
                case "uiUserInfoReqData":
                    this.updateUiUserInfo(e._data.UserID)
                }
        }
        ,
        l.prototype.getMeItem = function() {
            return window.YC.GC.getPlayer()
        }
        ,
        l.prototype.onNetClose = function() {
            u.prototype.onNetClose.apply(this, arguments),
            this.onResetData()
        }
        ,
        l.prototype.onNetDelay = function(e) {
            u.prototype.onNetDelay.apply(this, arguments),
            this._gameView && this._gameView.onNetDelay(e)
        }
        ,
        l.prototype.onInitData = function() {
            this._GameState = this.eGameState.GAME_NULL,
            this._nGameScore = new Array,
            this._bEnableOutCard = !1,
            this._nGameRule = 0,
            this._nMaxRoundCount = 0,
            this._nCurrentRound = 0,
            this._wCurrentRealRound = -1,
            this._nCurrentUser = r.INVALID_CHAIR,
            this._nBankerUser = r.INVALID_CHAIR,
            this._nFirstBankerUser = r.INVALID_CHAIR,
            this._nActionMask = 0,
            this._nActionCard = 0,
            this._nSendCard = 0,
            this._LeftCardCount = a.MAX_REPERTORY,
            this._nHandCardData = new Array,
            this._nHandCardCount = new Array,
            this._nWeaveCardData = new Array,
            this._nWeaveCardCount = new Array,
            this._nDiscardCard = new Array,
            this._nDiscardCount = new Array,
            this._oBigGameConclude = {},
            this._oTingData = {},
            this._oHuData = {},
            this._bAutoCard = !1,
            this._nOutCardUser = r.INVALID_CHAIR,
            this._nOutCardData = 0,
            this._bTingNodeVisible = !1,
            this._bCardFontSizeChange = !1,
            this._m_NoCanGang = new Array,
            this._isRecordMode = !1,
            this._bTing = new Array;
            for (var e = 0; e < a.GAME_PLAYER; e++)
                this._nHandCardData[e] = new Array,
                this._nHandCardCount[e] = 0,
                this._nWeaveCardData[e] = new Array,
                this._nWeaveCardCount[e] = 0,
                this._nDiscardCard[e] = new Array,
                this._nDiscardCount[e] = 0,
                this._nGameScore[e] = 0,
                this._m_NoCanGang[e] = 0,
                this._bTing[e] = !1;
            this._aryVoice = new Array,
            this._bPlayVoice = !1
        }
        ,
        l.prototype.onResetData = function() {
            this._GameState = this.eGameState.GAME_FREE,
            this._bEnableOutCard = !1,
            this._nCurrentUser = r.INVALID_CHAIR,
            this._nBankerUser = r.INVALID_CHAIR,
            this._nActionMask = 0,
            this._nActionCard = 0,
            this._nSendCard = 0,
            this._LeftCardCount = a.MAX_REPERTORY,
            this._oTingData = {},
            this._oHuData = {},
            this._bAutoCard = !1,
            this._m_NoCanGang = new Array,
            this._isRecordMode = !1,
            this._bTing = new Array;
            for (var e = 0; e < a.GAME_PLAYER; e++)
                this._nHandCardData[e].length = 0,
                this._nHandCardCount[e] = 0,
                this._nWeaveCardData[e].length = 0,
                this._nWeaveCardCount[e] = 0,
                this._nDiscardCard[e].length = 0,
                this._nDiscardCount[e] = 0,
                this._m_NoCanGang[e] = 0,
                this._bTing[e] = !1;
            this._aryVoice.length = 0,
            this._bPlayVoice = !1,
            this.setAutoCardState(!1),
            this.setTingNodeVisible(!1),
            this._gameView && this._gameView.onResetData()
        }
        ,
        l.prototype.getViewInfo = function() {
            return {
                _strViewRes: "client/res/game/sparrow/prefabs/sparrow",
                _strViewType: "sparrowpinghuView"
            }
        }
        ,
        l.prototype.preloadResList = function(e) {
            var t = r.GameOptionString
              , a = r.GameOptionResult;
            if (this.getGameSetValue(t.GAME_SCENE) == a.GAME_SCENE_2D) {
                e(this.geaCardFontResPath(), cc.SpriteAtlas),
                e(this.geaCardBackResPath(), cc.SpriteAtlas),
                e(this.getBackgroundResPath(), cc.SpriteFrame),
                e(this.getMjNameResPath(), cc.SpriteFrame),
                e("client/res/game/common/texture/arrow", cc.SpriteFrame);
                for (var i = 1; i < 6; i++)
                    e("sparrowpinghu/res/fufen_" + i, cc.SpriteFrame)
            }
        }
        ,
        l.prototype.geaCardFontResPath = function() {
            var e = this.getGameSetValue(r.GameOptionString.CARD_FONT_SIZE);
            if (e == r.GameOptionResult.BIG) {
                var t = r.GameOptionString;
                return "blue" == this.getGameSetValue(t.GAME_CARD_BACK) ? "client/res/game/sparrow/card/card_font_aoyun/card_font_aoyun" : "client/res/game/sparrow/card/card_font_laoyou/card_font_laoyou"
            }
            return e == r.GameOptionResult.MIDDLE ? "client/res/game/sparrow/card/card_font_middle/card_font_middle" : "client/res/game/sparrow/card/card_font/card_font"
        }
        ,
        l.prototype.geaCardBackResPath = function() {
            var e, t = this.getGameSetValue(r.GameOptionString.CARD_FONT_SIZE);
            if (t == r.GameOptionResult.BIG) {
                var a = r.GameOptionString;
                return "blue" == (e = this.getGameSetValue(a.GAME_CARD_BACK)) ? (this._bCardFontSizeChange = !0,
                "client/res/game/sparrow/card/blue_aoyun/blue_aoyun") : "client/res/game/sparrow/card/green_laoyou/green_laoyou"
            }
            return t == r.GameOptionResult.MIDDLE ? "client/res/game/sparrow/card/green_middle/green_middle" : (a = r.GameOptionString,
            r.GameOptionResult,
            "client/res/game/sparrow/card/" + (e = this.getGameSetValue(a.GAME_CARD_BACK)).toLowerCase() + "/" + e.toLowerCase())
        }
        ,
        l.prototype.getBackgroundResPath = function() {
            var e = r.GameOptionString;
            return r.GameOptionResult,
            "client/res/game/sparrow/bg/" + this.getGameSetValue(e.GAME_TABLE_BACK).toLowerCase()
        }
        ,
        l.prototype.getMjNameResPath = function() {
            return a.MJNAME_LUJING
        }
        ,
        l.prototype.changeCardBack = function() {
            if (this.getGameSetValue(r.GameOptionString.CARD_FONT_SIZE) != r.GameOptionResult.MIDDLE) {
                var e = this;
                this.loadRes(this.geaCardBackResPath(), cc.SpriteAtlas, function(t) {
                    null == t ? e.loadRes(e.geaCardFontResPath(), cc.SpriteAtlas, function(t) {
                        null == t ? 0 == e._bCardFontSizeChange ? e.getGameSetValue(r.GameOptionString.CARD_FONT_SIZE) != r.GameOptionResult.MIDDLE && e._gameView && e._gameView.changeCardBack() : window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u5f53\u524d\u66f4\u6539\u5c06\u5728\u4e0b\u5c40\u751f\u6548") : window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u5b57\u4e0b\u8f7d\u5931\u8d25")
                    }) : window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u80cc\u4e0b\u8f7d\u5931\u8d25\uff01\uff01")
                })
            }
        }
        ,
        l.prototype.changeCardFontSize = function() {
            var e = this;
            e._bCardFontSizeChange = !0,
            cc.log("changeCardFontSize" + e._bCardFontSizeChange),
            this.loadRes(this.geaCardBackResPath(), cc.SpriteAtlas, function(t) {
                null == t ? e.loadRes(e.geaCardFontResPath(), cc.SpriteAtlas, function(e) {
                    null == e || window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u5b57\u4e0b\u8f7d\u5931\u8d25")
                }) : window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u80cc\u4e0b\u8f7d\u5931\u8d25\uff01\uff01")
            })
        }
        ,
        l.prototype.onEventGameScene = function(e, t) {
            if (cc.log("enter onEventGameScene:" + e),
            null != this._gameView && window.YC.GC.hideWaiting(),
            this.onResetData(),
            s.GAME_SCENE_FREE == e) {
                var n = new a.GNet_S_Message.GNet_S_GameSceneFree;
                n.DeserializationData(t),
                this._nGameScore = i.copyArray(n._lGameScore),
                this._GameState = this.eGameState.GAME_FREE,
                this._nMaxRoundCount = n._wMaxRoundCount,
                this._nCurrentRound = n._wCurrentRound,
                this._wCurrentRealRound = n._wCurrentRealRound,
                this._nFirstBankerUser = n._wFirstBankerUser,
                this._dwTeaHouseLeaderID = n._dwTeaHouseLeaderID,
                this._gameView && this._gameView.refreshView()
            } else if (s.GAME_SCENE_PU_FEN == e) {
                var _ = new a.GNet_S_Message.GNet_S_GameSceneJiaPu;
                _.DeserializationData(t),
                this._nGameScore = i.copyArray(_._lGameScore),
                this._GameState = this.eGameState.GAME_PUFEN,
                this._nMaxRoundCount = _._wMaxRoundCount,
                this._nCurrentRound = _._wCurrentRound,
                this._wCurrentRealRound = _._wCurrentRealRound,
                this._nFirstBankerUser = _._wFirstBankerUser,
                this._dwTeaHouseLeaderID = _._dwTeaHouseLeaderID,
                this._pufentimer = _._pufentimer,
                this._cbPuFenRecord = i.copyArray(_._cbPuFenRecord),
                this._cbCanPuFen = _._cbCanPuFen,
                this._gameView && this._gameView.refreshView()
            } else if (s.GAME_SCENE_PLAY == e) {
                var d = new a.GNet_S_Message.GNet_S_GameScenePlay;
                if (d.DeserializationData(t),
                this._GameState = this.eGameState.GAME_PLAY,
                this._nGameScore = i.copyArray(d._lGameScore),
                this._nMaxRoundCount = d._wMaxRoundCount,
                this._nCurrentRound = d._wCurrentRound,
                this._wCurrentRealRound = d._wCurrentRealRound,
                this._bTing = i.copyArray(d._bTing),
                this._nFirstBankerUser = d._wFirstBankerUser,
                this._nBankerUser = d._wBankerUser,
                this._nCurrentUser = d._wCurrentUser,
                this._dwTeaHouseLeaderID = d._dwTeaHouseLeaderID,
                this._nActionMask = d._cbActionMask,
                this._nActionCard = d._cbActionCard,
                this._LeftCardCount = d._cbLeftCardCount,
                this._bEnableOutCard = d._wCurrentUser == this.getMeChairId() && 0 == this._nActionMask,
                this._nOutCardUser = d._wOutCardUser,
                this._nOutCardData = d._cbOutCardData,
                this._nSendCard = d._cbSendCardData,
                o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING) ? this._bAutoCard = d._bTing[this.getMeChairId()] : this._bAutoCard = d._bisAutoCard,
                this._bTingNodeVisible = d._bTing[this.getMeChairId()],
                this._m_NoCanGang = i.copyArray(d._m_NoCanGang),
                this._lJiaPu = i.copyArray(d._lJiaPu),
                1 == d._bisAutoCard && 0 != this._nSendCard) {
                    var c = function() {
                        this.autoSendCard(this._nSendCard),
                        window.YC.GC.getTimer().remove(c)
                    }
                    .bind(this);
                    window.YC.GC.getTimer().add(c, 1.5)
                }
                this._nHandCardData[this.getMeChairId()] = i.copyArray(d._cbCardData);
                for (var h = 0; h < a.GAME_PLAYER; h++)
                    this._nHandCardCount[h] = d._cbCardCount[h];
                for (h = 0; h < a.GAME_PLAYER; h++)
                    this._nDiscardCount[h] = d._cbDiscardCount[h],
                    this._nDiscardCard[h] = i.copyArray(d._cbDiscardCard[h]);
                for (d._wOutCardUser != r.INVALID_CHAIR && 0 != d._cbOutCardData && (this._nDiscardCard[d._wOutCardUser][this._nDiscardCount[d._wOutCardUser]++] = d._cbOutCardData),
                h = 0; h < a.GAME_PLAYER; h++) {
                    this._nWeaveCardCount[h] = d._cbWeaveItemCount[h];
                    for (var C = 0; C < d._cbWeaveItemCount[h]; C++) {
                        for (var u = d._oWeaveItemArray[h][C].cbWeaveKind, l = d._oWeaveItemArray[h][C].cbParam, g = C, p = d._oWeaveItemArray[h][C].wProvideUser, m = i.copyArray(d._oWeaveItemArray[h][C].cbCardData), I = 0, f = 0; f < m.length; f++)
                            m[f] > 0 && I++;
                        this._nWeaveCardData[h][C] = i.createWeaveItem(u, l, g, p, m, I)
                    }
                }
                this._gameView && this._gameView.refreshView()
            }
        }
        ,
        l.prototype.onEventGameMessage = function(e, t) {
            return _.SUB_S_GAME_START == e ? this.onSubGameStart(t) : _.SUB_S_OUT_CARD == e ? this.onSubOutCard(t) : _.SUB_S_SEND_CARD == e ? this.onSubSendCard(t) : _.SUB_S_OPERATE_NOTIFY == e ? this.onSubOperateNotify(t) : _.SUB_S_OPERATE_RESULT == e ? this.onSubOperateResult(t) : _.SUB_S_GAME_CONCLUDE == e ? this.onSubGameConclude(t) : _.SUB_S_TING_CARD == e ? this.onSubTingData(t) : _.SUB_S_AUTO_CARD_RESULT == e ? this.onSubAutoCardResult(t) : _.SUB_S_HU_CARD == e ? this.onSubHuData(t) : _.SUB_S_REFRESH_WEAVECARD == e ? this.onSubRefreshWeaveCard(t) : _.SUB_S_LISTEN_CARD == e ? this.onSubListenCard(t) : _.SUS_S_UPDATE_USER_SCORE == e ? this.onSubUpdateUserScore(t) : _.SUB_S_STAER_PU_FEN == e ? this.onSubStartPuFen(t) : _.SUB_S_STAER_PU_FEN_RESULT == e ? this.onSubUserJiaPu(t) : _.SUB_S_SHOW_DELAY_TIME == e ? this.onSubShowDelayTime(t) : _.SUB_S_SEND_TIME_AUTOS_TART == e ? this.onSendAutoStart(t) : void cc.log("subCMD_[%d] \u672a\u5904\u7406", e)
        }
        ,
        l.prototype.onGameResult = function(e) {
            cc.log("onGameResult"),
            u.prototype.onGameResult.apply(this, arguments),
            this._oBigGameConclude._ResultData = new a.GNet_S_Message.GNet_S_BigGameConclude,
            this._oBigGameConclude._ResultData.DeserializationData(e._streamSpecialInfo);
            var t = this.getTableUsers();
            this._oBigGameConclude._TebleUsers = {},
            this._oBigGameConclude._TebleUsers._wChairID = new Array,
            this._oBigGameConclude._TebleUsers._szMobileHeadUrl = new Array,
            this._oBigGameConclude._TebleUsers._szNickName = new Array,
            this._oBigGameConclude._TebleUsers._dwGameID = new Array,
            this._oBigGameConclude._TebleUsers._dwUserID = new Array,
            this._oBigGameConclude._TebleUsers._dwTeamID = new Array;
            for (var i = 0; i < a.GAME_PLAYER; i++)
                this._oBigGameConclude._TebleUsers._wChairID[i] = t[i]._wChairID,
                this._oBigGameConclude._TebleUsers._szMobileHeadUrl[i] = t[i]._szMobileHeadUrl,
                this._oBigGameConclude._TebleUsers._szNickName[i] = t[i]._szNickName,
                this._oBigGameConclude._TebleUsers._dwGameID[i] = t[i]._dwGameID,
                this._oBigGameConclude._TebleUsers._dwUserID[i] = t[i]._dwUserID,
                this._oBigGameConclude._TebleUsers._dwTeamID[i] = t[i]._dwTeamID
        }
        ,
        l.prototype.onUserExtRequestResult = function(e) {
            cc.log(e),
            this.updateUiUserInfo(e._dwUserID)
        }
        ,
        l.prototype.onButtonClickedEvent = function(e) {
            var t = this;
            switch (cc.log(e),
            e) {
            case "btn_pass":
                var s = function() {
                    t._nActionMask > 0 ? (o._and(t._nActionMask, i.WIK.WIK_LISTEN) && (t._gameView._CardLayer.cancelhandCardTingType(),
                    t._gameView.refreshHandCard(t.getMeChairId()),
                    t.sendUserListenCard(!1)),
                    t.sendOperateCard(i.WIK.WIK_NULL, [0, 0, 0], 3),
                    t._nActionMask = 0,
                    t._nActionCard = 0,
                    1 == t._bAutoCard && t._nCurrentUser == t.getMeChairId() && 0 != t._nSendCard && window.YC.GC.getTimer().add(function e() {
                        t.autoSendCard(t._nSendCard),
                        window.YC.GC.getTimer().remove(e)
                    }, .3)) : cc.log("onButtonClickedEvent error ActionMask = [%d]", t._nActionMask),
                    t._gameView.hideGameButtons()
                };
                this._gameView.isBtnHuVisible() ? window.YC.GC.showMessageBox("\u786e\u5b9a\u653e\u5f03\u80e1\u724c\uff1f", "\u63d0\u793a", function() {
                    s(),
                    t._nCurrentUser == t.getMeChairId() && (t._bEnableOutCard = !0),
                    cc.log("\u653e\u5f03\u80e1\u724c")
                }, function() {
                    cc.log("Cancel Btn Clicked")
                }) : this._gameView.isBtnGangVisible() ? (s(),
                t._nCurrentUser == t.getMeChairId() && (t._bEnableOutCard = !0)) : this._gameView.isBtnLiangXiVisible() ? (s(),
                t._nCurrentUser == t.getMeChairId() && (t._bEnableOutCard = !0)) : this._gameView.isBtnTingVisible() ? (s(),
                t._nCurrentUser == t.getMeChairId() && (t._bEnableOutCard = !0)) : s();
                break;
            case "btn_eat":
                if (this._nActionMask & i.WIK.WIK_LEFT || this._nActionMask & i.WIK.WIK_CENTER || this._nActionMask & i.WIK.WIK_RIGHT) {
                    for (var _ = i.getEatCardList(this._nActionCard, this._nHandCardData[this.getMeChairId()], this._nHandCardCount[this.getMeChairId()]), d = new Array, c = 0; c < _.length; c++)
                        d[c] = new Array,
                        d[c] = i.copyArray(_[c]._cbCardData);
                    1 == _.length ? (this.sendOperateCard(_[0]._WeaveKing, _[0]._cbCardData, 3),
                    this._gameView && this._gameView.hideGameButtons()) : _.length > 1 ? this._gameView && this._gameView.showChooseChi(d, function(e) {
                        e >= 0 && e < _.length && (t.sendOperateCard(_[e]._WeaveKing, _[e]._cbCardData, 3),
                        t._gameView && t._gameView.hideGameButtons())
                    }) : cc.error("getEatCardList error length == 0")
                } else
                    cc.log("onButtonClickedEvent error ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_bump":
                if (this._nActionMask & i.WIK.WIK_PENG) {
                    var h = [this._nActionCard, this._nActionCard, this._nActionCard];
                    this.sendOperateCard(i.WIK.WIK_PENG, h, 3)
                } else
                    cc.log("onButtonClickedEvent error ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_bridge":
                if (this._nActionMask & i.WIK.WIK_GANG)
                    if (this._nCurrentUser == this.getMeChairId()) {
                        var u = i.getGangCardsList(this._nWeaveCardData[this.getMeChairId()], this._nWeaveCardCount[this.getMeChairId()], this._nHandCardData[this.getMeChairId()], this._nHandCardCount[this.getMeChairId()], this._m_NoCanGang, !1);
                        for (d = new Array,
                        c = 0; c < u.length; c++)
                            d[c] = new Array,
                            d[c] = i.copyArray(u[c]._cbCardData);
                        1 == u.length ? (this.sendOperateCard(i.WIK.WIK_GANG, u[0]._cbCardData, 3),
                        this._gameView && this._gameView.hideGameButtons(),
                        this._bEnableOutCard = !1) : u.length > 1 ? this._gameView && this._gameView.showChooseGang(d, function(e) {
                            e >= 0 && e < u.length && (t.sendOperateCard(i.WIK.WIK_GANG, u[e]._cbCardData, 3),
                            t._gameView && t._gameView.hideGameButtons(),
                            t._bEnableOutCard = !1)
                        }) : cc.error("getGangCardsList error length == 0")
                    } else
                        this.sendOperateCard(i.WIK.WIK_GANG, [this._nActionCard, this._nActionCard, this._nActionCard], 3);
                else
                    cc.log("onButtonClickedEvent error ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_liangxi":
                if (this._nActionMask & i.WIK.WIK_LIANG_XI)
                    if (this._nCurrentUser == this.getMeChairId()) {
                        for (u = i.getLiangXiCardsList(this._nHandCardData[this.getMeChairId()], this._nHandCardCount[this.getMeChairId()]),
                        d = new Array,
                        c = 0; c < u.length; c++)
                            d[c] = new Array,
                            d[c] = i.copyArray(u[c]._cbCardData);
                        1 == u.length ? (this.sendOperateCard(i.WIK.WIK_LIANG_XI, u[0]._cbCardData, 3),
                        this._gameView && this._gameView.hideGameButtons(),
                        this._bEnableOutCard = !1) : u.length > 1 ? this._gameView && this._gameView.showChooseGang(d, function(e) {
                            e >= 0 && e < u.length && (t.sendOperateCard(i.WIK.WIK_LIANG_XI, u[e]._cbCardData, 3),
                            t._gameView && t._gameView.hideGameButtons(),
                            t._bEnableOutCard = !1)
                        }) : cc.error("getLiangXiCardsList error length == 0")
                    } else
                        this.sendOperateCard(i.WIK.WIK_GANG, [this._nActionCard, this._nActionCard, this._nActionCard], 3);
                else
                    cc.log("onButtonClickedEvent error ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_listen":
                this._nActionMask & i.WIK.WIK_LISTEN ? (h = [this._nActionCard, this._nActionCard, this._nActionCard],
                this.sendOperateCard(i.WIK.WIK_LISTEN, h, 3),
                this.sendUserListenCard(!0)) : cc.log("onButtonClickedEvent error case btn_listen: ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_win":
                this._nActionMask & i.WIK.WIK_CHI_HU ? (h = [this._nActionCard, this._nActionCard, this._nActionCard],
                this.sendOperateCard(i.WIK.WIK_CHI_HU, h, 3)) : cc.log("onButtonClickedEvent error ActionMask = [%d]", this._nActionMask);
                break;
            case "btn_auto_card_off":
                this.sendAutoCardBtn(!0);
                break;
            case "btn_auto_card_on":
                this.sendAutoCardBtn(!1);
                break;
            case "btn_show_card":
                if (null == this._gameView)
                    break;
                if (this._gameView.enbaleHuCardLayer() || 0 != i.objectIsNull(this._oHuData))
                    this._gameView.hideHuCardLayer();
                else {
                    for (c = 0; c < this._oHuData._cbHuCardCount; c++)
                        this._oHuData._cbHuCardRemainingCount[c] = this.getHuCardRemainingCount(this._oHuData._cbHuCardData[c]);
                    this._gameView.showHuCardLayer(this._oHuData)
                }
                break;
            case "btn_userinfo0":
            case "btn_userinfo1":
            case "btn_userinfo2":
            case "btn_userinfo3":
                var l = Number(e.substr(e.length - 1, 1))
                  , g = o.switchChairIDView(a.GAME_PLAYER, this.getMeChairId(), l)
                  , p = this.getUserItem(g);
                if (p) {
                    var m = {};
                    m._type = C,
                    m._para = {},
                    m._para.UserHeadUrl = p._szMobileHeadUrl,
                    m._para.UserName = p._szNickName,
                    m._para.GameID = p._dwGameID,
                    m._para.UserID = p._dwUserID,
                    m._para.UserGender = p._cbGender,
                    m._para.UserLocation = p._szDetailedLocation,
                    m._para.UserLocation_Long = 550,
                    o._and(this.getGameInfo()._llGameRule, r.GAME_RULE_HUDONG) ? m._para.bShowMagic = !0 : m._para.bShowMagic = !1,
                    m._para._updateData = !0,
                    this._GameFrame.sendQueryUserExt(p._dwUserID, this.getUserItem(this.getMeChairId())._dwUserID),
                    m._para.ZongJuShu = 0,
                    m._para.ShengLv = "0.00%",
                    m._para.LianSheng = 0,
                    m._para.bShowRoundInfo = !1,
                    window.YC.GC.postEvent(n.EventID.GE_UI_SHOW, m)
                } else
                    window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u7528\u6237\u4fe1\u606f\u83b7\u53d6\u5931\u8d25!!");
                break;
            default:
                cc.log("onButtonClickedEvent:" + e + ":Untreated")
            }
        }
        ,
        l.prototype.onUserJoin = function(e) {
            null != this._gameView && this._gameView.onUserJoinRoom(e)
        }
        ,
        l.prototype.onUserLeave = function(e, t) {
            null != this._gameView && this._gameView.onUserLeave(t)
        }
        ,
        l.prototype.onUserOffline = function(e) {
            null != this._gameView && this._gameView.onUserOffLine(e._wChairID)
        }
        ,
        l.prototype.onUserOfflineTime = function(e, t) {
            null != this._gameView && this._gameView.updateUserOfflineTime(e, t)
        }
        ,
        l.prototype.onUserLookon = function() {}
        ,
        l.prototype.onUserReady = function(e) {
            this._gameView && this._gameView.onUserReady(e._wChairID)
        }
        ,
        l.prototype.showResult = function() {
            this._gameView.btnStart.active = !1,
            this._gameView.btnCurrentResult.active = !1,
            window.YC.GC.postEvent(n.EventID.GE_UI_SHOW, this._tagShowResult)
        }
        ,
        l.prototype.onSubGameStart = function(e) {
            cc.log("enter onSubGameStart");
            var t = new a.GNet_S_Message.GNet_S_GameStart;
            return t.DeserializationData(e),
            this.onSubGameStartData(t),
            !0
        }
        ,
        l.prototype.onSubGameStartData = function(e) {
            this.onResetData(),
            this._gameView && this._gameView.showWaitJiaPu(!1),
            this._gameView && this._gameView.hidePuFenNode(),
            this._nCurrentUser = e._wBankerUser,
            this._nBankerUser = e._wBankerUser,
            this._nFirstBankerUser = e._wFirstBankerUser,
            this._nMaxRoundCount = e._wMaxRoundCount,
            this._nCurrentRound = e._wCurrentRound,
            this._wCurrentRealRound = e._wCurrentRealRound,
            this._GameState = this.eGameState.GAME_PLAY,
            this._LeftCardCount = a.MAX_REPERTORY,
            1 == this._bCardFontSizeChange && (cc.log("onSubGameStartData \u6b63\u5728\u4fee\u6539\u724c\u5b57\u5927\u5c0f"),
            this._gameView && 1 == this._gameView.changeCardFontSize() && (this._bCardFontSizeChange = !1,
            window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u724c\u5b57\u5927\u5c0f\u66f4\u6539\u5df2\u751f\u6548")));
            for (var t = 0; t < a.GAME_PLAYER; t++)
                null != this._gameView && this._gameView && this._gameView.setPlayerListen(t, !1);
            for (t = 0; t < a.GAME_PLAYER; t++)
                t == window.YC.GC.getPlayer()._wChairID && (i.SortCardList(e._cbCardData),
                this._nHandCardData[t] = i.copyArray(e._cbCardData)),
                t == this._nCurrentUser ? this._nHandCardCount[t] = a.MAX_COUNT : this._nHandCardCount[t] = a.MAX_COUNT - 1,
                this._LeftCardCount -= this._nHandCardCount[t];
            this._gameView && this._gameView.hideGpsNode();
            var r = this;
            this._gameView && this._gameView.onGameStart(this._nHandCardData, this._nHandCardCount, function() {
                if (r._nCurrentUser == r.getMeChairId() && 0 == e._cbUserAction && (r._bEnableOutCard = !0),
                0 != e._cbUserAction) {
                    r._nActionMask = e._cbUserAction,
                    r._nActionCard = 0,
                    r._gameView && r._gameView.showGameButtons(e._cbUserAction);
                    var t = r.getHandPromptCard(r._nActionMask, r._nActionCard);
                    r._gameView && r._gameView.setPromptCardStyle(t)
                }
            })
        }
        ,
        l.prototype.onExitGame = function() {
            cc.log("onExitGame"),
            window.YC.GC.getTapingManager().setCallback(null),
            this._gameView && this._gameView.onExitGame(),
            this.stopBackMusic(),
            u.prototype.onExitGame.apply(this, arguments)
        }
        ,
        l.prototype.onSubOutCard = function(e) {
            cc.log("onSubOutCard");
            var t = new a.GNet_S_Message.GNet_S_GameOutCard;
            return t.DeserializationData(e),
            this.onSubOutCardData(t),
            !0
        }
        ,
        l.prototype.onSubOutCardData = function(e) {
            if (e._wOutCardUser != window.YC.GC.getPlayer()._wChairID) {
                this.removeHandCard(e._wOutCardUser, null),
                this._nDiscardCard[e._wOutCardUser][this._nDiscardCount[e._wOutCardUser]++] = e._cbOutCardData;
                var t = this.getTableUser(e._wOutCardUser)._cbGender;
                this.playCardDataSound(t, e._cbOutCardData)
            }
            this._bTing = e._bTing,
            this._nCurrentUser = r.INVALID_CHAIR,
            this._gameView && this._gameView.gameOutCard(e._wOutCardUser, e._cbOutCardData)
        }
        ,
        l.prototype.onSubSendCard = function(e) {
            cc.log("onSubSendCard");
            var t = new a.GNet_S_Message.GNet_S_GameSendCard;
            return t.DeserializationData(e),
            this.onSubSendCardData(t),
            !0
        }
        ,
        l.prototype.onSubSendCardData = function(e) {
            if (this._nSendCard = e._cbCardData,
            this._nCurrentUser = e._wSendCardUser,
            this._LeftCardCount -= 1,
            this.addHandCard(e._wSendCardUser, e._cbCardData),
            this._gameView && this._gameView.gameSendCard(e._wSendCardUser, e._cbCardData),
            e._wSendCardUser == this.getMeChairId() && 0 == e._bFinalCard) {
                if (0 == e._wActionMask ? this._bEnableOutCard = !0 : this._bEnableOutCard = !1,
                0 != e._wActionMask) {
                    this._nActionMask = e._wActionMask,
                    this._nActionCard = 0,
                    o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING) || this.sendAutoCardBtn(!1),
                    this._gameView && this._gameView.showGameButtons(e._wActionMask);
                    var t = this.getHandPromptCard(this._nActionMask, this._nActionCard);
                    this._gameView && this._gameView.setPromptCardStyle(t)
                } else if (1 == this._bAutoCard) {
                    var a = this;
                    window.YC.GC.getTimer().add(function t() {
                        a.autoSendCard(e._cbCardData),
                        window.YC.GC.getTimer().remove(t)
                    }, .3)
                }
                this._gameView && this._gameView.hideHuCardLayer()
            }
        }
        ,
        l.prototype.onSubOperateNotify = function(e) {
            cc.log("onSubOperateNotify");
            var t = new a.GNet_S_Message.GNet_S_OperateNotify;
            t.DeserializationData(e),
            this.onSubOperateNotifyData(t)
        }
        ,
        l.prototype.onSubOperateNotifyData = function(e) {
            0 == e._wActionMask && cc.err("onSubOperateNotify err _wActionMask == 0"),
            this._nActionMask = e._wActionMask,
            this._nActionCard = e._cbActionCard,
            this._nActionMask > 0 && (this._bEnableOutCard = !1),
            this._gameView && this._gameView.showGameButtons(e._wActionMask);
            var t = this.getHandPromptCard(e._wActionMask, e._cbActionCard);
            this._gameView && this._gameView.setPromptCardStyle(t)
        }
        ,
        l.prototype.onSubAutoCardResult = function(e) {
            cc.log("onSubAutoCardResult");
            var t = new a.GNet_S_Message.GNET_S_AutoCardResult;
            return t.DeserializationData(e),
            this.onSubAutoCardResultData(t),
            !0
        }
        ,
        l.prototype.onSubAutoCardResultData = function(e) {
            this.setAutoCardState(e._bIsAutoCard);
            var t = this
              , a = function e() {
                t.autoSendCard(t._nSendCard),
                window.YC.GC.getTimer().remove(e)
            };
            1 == e._bIsAutoCard && this._nCurrentUser == this.getMeChairId() && 0 != this._nSendCard ? (window.YC.GC.getTimer().remove(a),
            window.YC.GC.getTimer().add(a, .3)) : window.YC.GC.getTimer().remove(a)
        }
        ,
        l.prototype.sendUserListenCard = function(e) {
            var t = new a.GNet_C_Message.GNet_C_ListenCard;
            return t._bListenCard = e,
            this._GameFrame.sendNetMessage(t)
        }
        ,
        l.prototype.onSubUpdateUserScore = function(e) {
            cc.log("onSubUpdateUserScore");
            var t = new a.GNet_S_Message.GNet_S_UpdateUserScore;
            t.DeserializationData(e),
            this.onSubUpdateUserScoreDate(t)
        }
        ,
        l.prototype.onSubUpdateUserScoreDate = function(e) {
            for (var t = 0; t < a.GAME_PLAYER; t++) {
                var i = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), t);
                this._nGameScore[t] = e._lScore[t],
                this._gameView && this._gameView.setPlayerScore(i, this._nGameScore[t])
            }
        }
        ,
        l.prototype.onSubStartPuFen = function(e) {
            cc.log("onSubUpdateUserScore");
            var t = new a.GNet_S_Message.GNet_S_StartPuFen;
            t.DeserializationData(e),
            this.onSubStartPuFenData(t)
        }
        ,
        l.prototype.onSubStartPuFenData = function(e) {
            this._gameView && this._gameView.showPuFenNode(e._cbCanPuFen, 15)
        }
        ,
        l.prototype.onSubUserJiaPu = function(e) {
            cc.log("onSubUpdateUserScore");
            var t = new a.GNet_S_Message.GNet_S_StartPuFenResult;
            t.DeserializationData(e),
            this.onSubUserJiaPuData(t)
        }
        ,
        l.prototype.onSubUserJiaPuData = function(e) {
            var t = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), e._wChairID);
            this._gameView && this._gameView.setPlayerPuFen(t, e._cbPuFenRecord),
            t == a.MY_VIEWID && 0 == e._bStartGame && this._gameView && this._gameView.showWaitJiaPu(!0),
            t == a.MY_VIEWID && this._gameView && this._gameView.hidePuFenNode(),
            1 == e._bStartGame && this._gameView && this._gameView.showWaitJiaPu(!1)
        }
        ,
        l.prototype.onSubListenCard = function(e) {
            cc.log("onSubRefreshWeaveCard");
            var t = new a.GNet_S_Message.GNet_S_ListenCard;
            t.DeserializationData(e),
            this.onSubListenCardData(t)
        }
        ,
        l.prototype.onSubListenCardData = function(e) {
            this._bTing[e._wListenUser] = !0,
            this._bAutoCard = !0,
            this.setTingNodeVisible(e._bListen),
            o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING) ? this.setAutoCardState(!0) : this.setAutoCardState(e._bAutoCard)
        }
        ,
        l.prototype.onSubRefreshWeaveCard = function(e) {
            cc.log("onSubRefreshWeaveCard");
            var t = new a.GNet_S_Message.GNET_S_RefreshWeaveCard;
            t.DeserializationData(e),
            this.onSubRefreshWeaveCardData(t)
        }
        ,
        l.prototype.onSubRefreshWeaveCardData = function(e) {
            for (var t = null, r = i.createWeaveItem(i.WIK.WIK_PENG, i.PARM.WIK_GANERAL, e._wProvideUser, e._wProvideUser, [e._cbWeaveCard, e._cbWeaveCard, e._cbWeaveCard], 3), n = 0; n < this._nWeaveCardCount[e._wProvideUser]; n++) {
                var s = this._nWeaveCardData[e._wProvideUser][n];
                if (s._wWeaveKind == i.WIK.WIK_GANG && s._cbParam == i.PARM.WIK_MING_GANG && s._cbCardData[0] == e._cbWeaveCard) {
                    t = n,
                    this._nWeaveCardData[e._wProvideUser][n] = r;
                    break
                }
            }
            if (null != t) {
                var _ = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), e._wProvideUser);
                this._gameView && this._gameView._CardLayer.EditWeaCard(t, _, r._cbCardData, r._cbCardCount, r._cbPublicCard)
            }
        }
        ,
        l.prototype.onSubHuData = function(e) {
            cc.log("onSubHuData");
            var t = new a.GNet_S_Message.GNet_S_Hu_Data;
            return t.DeserializationData(e),
            this.onSubHuDataData(t),
            !0
        }
        ,
        l.prototype.onSubHuDataData = function(e) {
            this._oHuData._cbHuCardCount = e._cbHuCardCount,
            this._oHuData._cbHuCardData = e._cbHuCardData,
            this._oHuData._cbHuCardRemainingCount = e._cbHuCardRemainingCount,
            this._oHuData._cbHuCardFanCount = e._cbHuCardFanCount,
            this._oHuData._dwChiHuRight = e._dwChiHuRight,
            this._oTingData = {}
        }
        ,
        l.prototype.onSubTingData = function(e) {
            cc.log("onSubTingData");
            var t = new a.GNet_S_Message.GNet_S_Ting_Data;
            return t.DeserializationData(e),
            this.onSubTingDataData(t),
            !0
        }
        ,
        l.prototype.onSubTingDataData = function(e) {
            return this._oTingData._cbOutCardCount = e._cbOutCardCount,
            this._oTingData._cbOutCardData = e._cbOutCardData,
            this._oTingData._cbHuCardCount = e._cbHuCardCount,
            this._oTingData._cbHuCardData = e._cbHuCardData,
            this._oTingData._cbHuCardRemainingCount = e._cbHuCardRemainingCount,
            this._oTingData._cbHuCardFanCount = e._cbHuCardFanCount,
            this._oTingData._dwChiHuRight = e._dwChiHuRight,
            this._oTingData._bShow = e._bShow,
            this._oTingData._bTouth = e._bTouth,
            this._oHuData = {},
            this._gameView && this._gameView.setHandCardTingType(this._oTingData, !0),
            !0
        }
        ,
        l.prototype.onSubShowDelayTime = function(e) {
            cc.log("onSubShowDelayTime");
            var t = new a.GNet_S_Message.GNET_S_ShowDelayTime;
            t.DeserializationData(e),
            this.onSubShowDelayTimeData(t)
        }
        ,
        l.prototype.onSubShowDelayTimeData = function(e) {
            if (0 == e._bShow) {
                var t = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), e._wChairID);
                this._gameView && this._gameView.setDelayTime(t, e._bShow, 0, 0, 0)
            } else
                for (var i = 0; i < a.GAME_PLAYER; i++)
                    (e._wDelayDissoveTime[i] > 0 || e._wTotalDelayDissoveTime[i] > 0 || e._wTotalOfflineDissoveTime[i] > 0) && (t = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), i),
                    this._gameView && this._gameView.setDelayTime(t, e._bShow, e._wDelayDissoveTime[i], e._wTotalDelayDissoveTime[i], e._wTotalOfflineDissoveTime[i]))
        }
        ,
        l.prototype.onSendAutoStart = function(e) {
            var t = new a.GNet_S_Message.CMD_S_AutoStartData;
            if (t.DeserializationData(e),
            o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_TYPE_NO_OUTCARD5_JIE_SAN)) {
                var r = window.YC.GC.getUIManager().getUI(d);
                if (r && (r.setAutoStartTime(t._cbAutoStartTime),
                0 == t._cbAutoStartTime)) {
                    var s = {};
                    s._type = d,
                    window.YC.GC.postEvent(n.EventID.GE_UI_HIDE, s)
                }
            }
        }
        ,
        l.prototype.onSubGameConclude = function(e) {
            cc.log("onSubGameConclude");
            var t = new a.GNet_S_Message.GNet_S_GameConclude;
            return t.DeserializationData(e),
            this.onSubGameConcludeData(t),
            !0
        }
        ,
        l.prototype.onSubGameConcludeData = function(e) {
            if (this._GameState == this.eGameState.GAME_FREE && null != this._tagShowResult)
                return this._tagShowResult._para._bGameEnd = e._bIsBigResult,
                this._bGameEnd = e._bIsBigResult,
                void window.YC.GC.postEvent(n.EventID.GE_UI_SHOW, this._tagShowResult);
            this._GameState = this.eGameState.GAME_FREE,
            this.setAutoCardState(!1),
            this.setTingNodeVisible(!1),
            this._gameView && this._gameView.hideChooseGang(),
            this._gameView && this._gameView.hideChooseChi();
            for (var t = this, s = 0; s < a.GAME_PLAYER; s++)
                e._lTotalScore ? this._nGameScore[s] = e._lTotalScore[s] : this._nGameScore[s] += e._lGameScore[s].toNumber();
            this._tagShowResult = {},
            o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), this.getMeChairId()),
            this._tagShowResult._type = d,
            this._tagShowResult._para = {},
            this._tagShowResult._para._gameRule = "",
            this._tagShowResult._para._nRoomID = this.getGameInfo()._strRoomID,
            this._tagShowResult._para._strRoundMsg = e._wCurrentRound + "/" + e._wMaxRoundCount,
            this._tagShowResult._para._CMD = a,
            this._tagShowResult._para._winnerIndex = [r.INVALID_CHAIR, r.INVALID_CHAIR, r.INVALID_CHAIR, r.INVALID_CHAIR];
            var _ = [r.INVALID_CHAIR, r.INVALID_CHAIR, r.INVALID_CHAIR, r.INVALID_CHAIR]
              , c = r.INVALID_CHAIR
              , h = 0;
            for (s = 0; s < a.GAME_PLAYER; s++)
                e._dwChiHuKind[s] != i.WIK.WIK_CHI_HU || (this._tagShowResult._para._winnerIndex[h++] = s,
                _[s] = s,
                c = s);
            this._tagShowResult._para._WinNum = h;
            var C = new Date;
            for (this._tagShowResult._para._strTime = C.getFullYear() + "-" + (C.getMonth() + 1) + "-" + C.getDate() + " " + C.getHours() + ":" + C.getMinutes(),
            this._tagShowResult._para._nBankerUser = e._wBankerUser,
            this._tagShowResult._para._bOpen = [],
            this._tagShowResult._para._bTing = [],
            s = 0; s < a.GAME_PLAYER; s++)
                this._tagShowResult._para._bOpen[s] = e._bOpen[s],
                this._tagShowResult._para._bTing[s] = e._bTing[s];
            for (this._tagShowResult._para._bVisibleItem = [!1, !1, !0, !0],
            this._tagShowResult._para._strItem = ["\u80e1\u5206", "\u6760\u5206", "\u80e1\u5206", "\u6760\u5206"],
            this._tagShowResult._para._strItemScore = new Array,
            s = 0; s < 4; s++) {
                if (this._tagShowResult._para._strItemScore[s] = new Array,
                0 == s)
                    for (var u = 0; u < a.GAME_PLAYER; u++)
                        this._tagShowResult._para._strItemScore[s][u] = e._cbminggang[u];
                else if (1 == s)
                    for (u = 0; u < a.GAME_PLAYER; u++)
                        this._tagShowResult._para._strItemScore[s][u] = e._cbangang[u];
                if (2 == s)
                    for (u = 0; u < a.GAME_PLAYER; u++)
                        this._tagShowResult._para._strItemScore[s][u] = e._lGameScore[u] - e._lGangScore[u];
                else if (3 == s)
                    for (u = 0; u < a.GAME_PLAYER; u++)
                        this._tagShowResult._para._strItemScore[s][u] = e._lGangScore[u]
            }
            var l = {};
            for (l.wProvideUser = e._wProvideUser,
            l.wBankerUser = e._wBankerUser,
            l.bOpen = [],
            l.cb_bDianGang = [],
            l.cb_bMoGang = [],
            l.cb_bAnGang = [],
            l.cb_liangxinum = [],
            l.cbPuFen = [],
            l._bTing = [],
            s = 0; s < a.GAME_PLAYER; s++)
                l.bOpen[s] = e._bOpen[s],
                l.cb_bDianGang[s] = e.cb_bDianGang[s],
                l.cb_bMoGang[s] = e.cb_bMoGang[s],
                l.cb_bAnGang[s] = e.cb_bAnGang[s],
                l.cb_liangxinum[s] = e.cb_liangxinum[s],
                l.cbPuFen[s] = e.cbPuFen[s],
                l._bTing[s] = e._bTing[s];
            this._tagShowResult._para._myChairID = this.getMeChairId(),
            this._tagShowResult._para._provideUser = e._wProvideUser,
            this._tagShowResult._para._headUrl = [],
            this._tagShowResult._para._strName = [],
            this._tagShowResult._para._nID = [],
            this._tagShowResult._para._dwTeamIDs = [],
            this._tagShowResult._para._bGameEnd = e._bIsBigResult,
            this._bGameEnd = e._bIsBigResult,
            this._tagShowResult._para._nTotalScore = [],
            1 == e._bNaturalConclude && 0 != e._cbProvideCard && (this._tagShowResult._para._provideCard = this._gameView._CardLayer._oCreateCard.createHandCardSpr(a.DIRECTION_SOUTH, e._cbProvideCard)),
            this._tagShowResult._para._dwChiHuKind = [],
            this._tagShowResult._para._nChiHuRight = [],
            this._tagShowResult._para._nCardCount = [],
            this._tagShowResult._para._cardGroup = new Array,
            this._tagShowResult._para._nWeaveCount = [],
            this._tagShowResult._para._weaveGroup = [],
            this._tagShowResult._para._strChiHuRight = [];
            var g = this.getTableUsers();
            for (s = 0; s < a.GAME_PLAYER; s++) {
                var p = g[s]._wChairID;
                this._tagShowResult._para._headUrl[p] = g[s]._szMobileHeadUrl,
                this._tagShowResult._para._strName[p] = g[s]._szNickName,
                this._tagShowResult._para._nID[p] = g[s]._dwGameID,
                this._tagShowResult._para._dwTeamIDs[p] = g[s]._dwTeamID,
                this._tagShowResult._para._nTotalScore[s] = e._lGameScore[s],
                this._tagShowResult._para._dwChiHuKind[s] = e._dwChiHuKind[s],
                this._tagShowResult._para._nChiHuRight[s] = e._dwChiHuRight[s],
                this._tagShowResult._para._nCardCount[s] = e._cbCardCount[s],
                this._tagShowResult._para._nWeaveCount[s] = e._cbWeaveItemCount[s],
                this._tagShowResult._para._cardGroup[s] = new Array,
                this._tagShowResult._para._weaveGroup[s] = new Array;
                var m = (_[s],
                r.INVALID_CHAIR,
                e._dwChiHuRight[s])
                  , I = o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING);
                for (this._tagShowResult._para._provideUser == s ? this._tagShowResult._para._strChiHuRight[s] = i.analyseChiHuRight(e._dwChiHuRight[c], l, _[c], s, I) : this._tagShowResult._para._strChiHuRight[s] = i.analyseChiHuRight(m, l, _[s], s, I),
                u = 0; u < e._cbCardCount[s]; u++)
                    this._tagShowResult._para._cardGroup[s][u] = this._gameView._CardLayer._oCreateCard.createHandCardSpr(a.DIRECTION_SOUTH, e._cbHandCardData[s][u]);
                for (u = 0; u < e._cbWeaveItemCount[s]; u++) {
                    for (var f = 0, w = 0; w < 4; w++)
                        e._WeaveItemArray[s][u].cbCardData[w] && f++;
                    var A = !0;
                    e._WeaveItemArray[s][u].cbParam == i.PARM.WIK_AN_GANG && (A = !1),
                    this._tagShowResult._para._weaveGroup[s][u] = this._gameView._CardLayer._oCreateCard.createWeaCard(a.DIRECTION_SOUTH, e._WeaveItemArray[s][u].cbCardData, f, A)
                }
            }
            this._tagShowResult._para.bRecord = !!e.bRecord,
            this._gameView && this._gameView.onGameConclude(e, function() {
                t.showResult()
            }
            .bind(this))
        }
        ,
        l.prototype.onTouchBigResult = function() {
            var e = {};
            e._type = c,
            e._para = {},
            e._para._nRoomNum = this.getGameInfo()._strRoomID,
            e._para._strRoundMsg = this._nCurrentRound + "/" + this._nMaxRoundCount;
            var t = new Date
              , i = t.getMonth() + 1;
            e._para._strTime = t.getFullYear() + "-" + i + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes();
            var r = this._oBigGameConclude._TebleUsers;
            e._para._playCount = a.GAME_PLAYER,
            e._para._strHeadURL = [],
            e._para._strName = [],
            e._para._strID = [],
            e._para._dwTeamIDs = [],
            e._para._nZimoTimes = [],
            e._para._nHuTimes = [],
            e._para._nDianPaoTimes = [],
            e._para._nTotalScore = [];
            for (var o = 0, s = 0; s < a.GAME_PLAYER; s++) {
                var _ = r._wChairID[s];
                e._para._strHeadURL[_] = r._szMobileHeadUrl[s],
                0 == this.getGameInfo()._dwGroupID && this.getGameInfo()._dwOwnerID == r._dwUserID[s] ? e._para._strName[_] = "(\u623f\u4e3b)" + r._szNickName[s] : e._para._strName[_] = r._szNickName[s],
                r._dwGameID[s] == window.YC.GC.getPlayer()._dwGameID && (o = r._dwTeamID[s]),
                e._para._dwTeamIDs[_] = r._dwTeamID[s],
                e._para._strID[_] = "ID:" + r._dwGameID[s],
                e._para._nZimoTimes[s] = this._oBigGameConclude._ResultData._cbZiMoNum[s],
                e._para._nHuTimes[s] = this._oBigGameConclude._ResultData._cbJiePaoNum[s],
                e._para._nDianPaoTimes[s] = this._oBigGameConclude._ResultData._cbDianPaoNum[s],
                e._para._nTotalScore[s] = this._oBigGameConclude._ResultData._lTotalScore[s],
                cc.log(e._para._strName[s] + " \u81ea\u6478:" + e._para._nZimoTimes[s] + " \u80e1:" + e._para._nHuTimes[s] + " \u70b9\u70ae:" + e._para._nDianPaoTimes[s])
            }
            e._para._dwGroupID = this.getGameInfo()._dwGroupID,
            e._para._cbGroupType = this.getGameInfo()._cbGroupType,
            e._para._dwTeamID = o,
            e._para._wKindID = this.getGameInfo()._dwKindID,
            e._para._llGameRule = this.getGameInfo()._llGameRule,
            e._para._cbFloorIndex = this.getGameInfo()._cbFloorIndex,
            e._para._showZuiJiaPaoShou = !0,
            window.YC.GC.postEvent(n.EventID.GE_UI_SHOW, e)
        }
        ,
        l.prototype.onSubOperateResult = function(e) {
            cc.log("onSubOperateResult");
            var t = new a.GNet_S_Message.GNet_S_OperateResult;
            t.DeserializationData(e),
            this.onSubOperateResultData(t)
        }
        ,
        l.prototype.onSubOperateResultData = function(e) {
            if (e._wOperateCode != i.WIK.WIK_LISTEN) {
                this._bEnableOutCard = !0,
                this._nCurrentUser = e._wOperateUser,
                this._nSendCard = 0,
                this._nCurrentUser == this.getMeChairId() && (this._oTingData = {},
                this._oHuData = {});
                var t = void 0
                  , n = i.createWeaveItem(e._wOperateCode, e._cbOperateParam, e._wOperateUser, e._wProvideUser, e._cbOperateCard, e._cbOperateCardCount);
                if (n._cbParam != i.PARM.WIK_MING_GANG)
                    t = this._nWeaveCardCount[e._wOperateUser],
                    this._nWeaveCardData[e._wOperateUser][t] = n,
                    this._nWeaveCardCount[e._wOperateUser]++;
                else
                    for (var s = 0; s < this._nWeaveCardCount[e._wOperateUser]; s++) {
                        var _ = this._nWeaveCardData[e._wOperateUser][s];
                        if (_._wWeaveKind == i.WIK.WIK_PENG && _._cbCardData[0] == n._cbCardData[0]) {
                            t = s,
                            this._nWeaveCardData[e._wOperateUser][s] = n;
                            break
                        }
                    }
                if (e._wOperateCode == i.WIK.WIK_PENG)
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]);
                else if (e._wOperateCode == i.WIK.WIK_LEFT || e._wOperateCode == i.WIK.WIK_CENTER || e._wOperateCode == i.WIK.WIK_RIGHT)
                    if (e._wOperateUser == this.getMeChairId())
                        for (s = 0; s < 3; s++)
                            e._cbOperateCard[s] != this._nActionCard && this.removeHandCard(e._wOperateUser, e._cbOperateCard[s]);
                    else
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                        this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]);
                else
                    e._wOperateCode == i.WIK.WIK_GANG ? (n._cbParam == i.PARM.WIK_MING_GANG ? this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]) : n._cbParam == i.PARM.WIK_FANG_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : n._cbParam == i.PARM.WIK_AN_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : n._cbParam == i.PARM.WIK_DIRECTION_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[2]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[3])) : n._cbParam == i.PARM.WIK_ZFB_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[2])) : cc.error("onSubOperateResult error WeaData._cbParam = [%d]", n._cbParam),
                    n._cbParam != i.PARM.WIK_ZFB_GANG && n._cbParam != i.PARM.WIK_DIRECTION_GANG && (this._nCurrentUser = r.INVALID_CHAIR)) : e._wOperateCode == i.WIK.WIK_GANG ? (n._cbParam == i.PARM.WIK_MING_GANG ? this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]) : n._cbParam == i.PARM.WIK_FANG_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : n._cbParam == i.PARM.WIK_AN_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[0])) : n._cbParam == i.PARM.WIK_DIRECTION_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[2]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[3])) : n._cbParam == i.PARM.WIK_ZFB_GANG ? (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[2])) : cc.error("onSubOperateResult error WeaData._cbParam = [%d]", n._cbParam),
                    n._cbParam != i.PARM.WIK_ZFB_GANG && n._cbParam != i.PARM.WIK_DIRECTION_GANG && (this._nCurrentUser = r.INVALID_CHAIR)) : e._wOperateCode == i.WIK.WIK_LIANG_XI && (this.removeHandCard(e._wOperateUser, e._cbOperateCard[0]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[1]),
                    this.removeHandCard(e._wOperateUser, e._cbOperateCard[2]));
                e._wOperateUser == e._wProvideUser || e._wOperateCode == i.WIK.WIK_GANG && e._cbOperateParam == i.PARM.WIK_MING_GANG || (this._nDiscardCard[e._wProvideUser][--this._nDiscardCount[e._wProvideUser]] = 0,
                this._gameView && this._gameView._CardLayer.plCardMoveHide(o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), e._wProvideUser))),
                null != this._gameView && (this._gameView && this._gameView.OperateResult(e._wOperateUser, n, t),
                this._gameView && this._gameView.showOprateFlag(e._wOperateUser, e._wOperateCode))
            } else if (e._wOperateCode == i.WIK.WIK_LISTEN) {
                this._gameView && this._gameView.cancelPromptCardStyle(),
                this._gameView && this._gameView.refreshHandCard(this.getMeChairId()),
                e._wOperateUser == this.getMeChairId() && (this._bEnableOutCard = !0,
                this._gameView && this._gameView._CardLayer.cancelhandCardTingType(),
                this._gameView && this._gameView._CardLayer.setHandCardTingType(this._oTingData, !0));
                var d = o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), e._wOperateUser);
                this._gameView && this._gameView.setPlayerListen(d, !0),
                this._gameView && this._gameView.showOprateFlag(e._wOperateUser, i.WIK.WIK_LISTEN)
            }
            var c = this.getTableUser(e._wOperateUser)._cbGender;
            this._m_NoCanGang = i.copyArray(e._m_NoCanGang),
            this.playActionSound(c, e._wOperateCode),
            this._nActionMask = 0,
            this._nActionCard = 0,
            this._gameView && this._gameView.hideChooseGang(),
            this._gameView && this._gameView.hideChooseChi()
        }
        ,
        l.prototype.popupCard = function(e) {
            if (cc.log("popupCard" + e),
            this._nCurrentUser == this.getMeChairId()) {
                this._gameView && this._gameView.hideHuCardLayer(!0);
                for (var t = i.SwitchTingDataToHuData(this._oTingData, e), a = 0; a < t._cbHuCardCount; a++)
                    t._cbHuCardRemainingCount[a] = this.getHuCardRemainingCount(t._cbHuCardData[a]);
                this._gameView && this._gameView.showHuCardLayer(t)
            }
        }
        ,
        l.prototype.dropCard = function(e) {
            cc.log("dropCard" + e),
            this._gameView && this._gameView.hideHuCardLayer(!0)
        }
        ,
        l.prototype.sendOutCard = function(e) {
            var t = new a.GNet_C_Message.GNet_C_OutCard;
            return t._cbCardData = e,
            1 == this._GameFrame.sendNetMessage(t) || (cc.log("sendOutCard error"),
            !1)
        }
        ,
        l.prototype.touchSendOutCard = function(e) {
            if (this._nCurrentUser != window.YC.GC.getPlayer()._wChairID)
                return cc.error("touchSendOutCard error this._nCurrentUser = " + this._nCurrentUser),
                !1;
            if (0 == this._bEnableOutCard)
                return cc.error("touchSendOutCard error this._bEnableOutCard = " + this._bEnableOutCard),
                !1;
            if (1 == this._bAutoCard)
                return !1;
            var t = this.sendOutCard(e);
            if (1 == t) {
                0 == this.removeHandCard(window.YC.GC.getPlayer()._wChairID, e) && cc.log("\u624b\u724c\u5220\u9664\u5931\u8d25[%d]", e),
                this._nSendCard = 0,
                this._bEnableOutCard = !1,
                this._nCurrentUser = r.INVALID_CHAIR,
                this._nDiscardCard[this.getMeChairId()][this._nDiscardCount[this.getMeChairId()]++] = e;
                var a = window.YC.GC.getPlayer()._cbGender;
                this.playCardDataSound(a, e),
                this._oHuData = i.SwitchTingDataToHuData(this._oTingData, e),
                this._oTingData = {}
            } else
                cc.error("touchSendOutCard send failed");
            return t
        }
        ,
        l.prototype.autoSendCard = function(e) {
            if (this._nCurrentUser != this.getMeChairId())
                return !1;
            if (0 == this._bAutoCard)
                return !1;
            if (0 != this._nActionMask)
                return o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING) || this.sendAutoCardBtn(!1),
                window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u8bf7\u5148\u5904\u7406\u54cd\u5e94\u64cd\u4f5c"),
                !1;
            var t = this.sendOutCard(e);
            if (1 == t) {
                0 == this.removeHandCard(this.getMeChairId(), e) && cc.log("\u624b\u724c\u5220\u9664\u5931\u8d25[%d]", e),
                this._nSendCard = 0,
                this._bEnableOutCard = !1,
                this._nCurrentUser = r.INVALID_CHAIR,
                this._nDiscardCard[this.getMeChairId()][this._nDiscardCount[this.getMeChairId()]++] = e;
                var a = window.YC.GC.getPlayer()._cbGender;
                this.playCardDataSound(a, e),
                this._oHuData = i.SwitchTingDataToHuData(this._oTingData, e),
                this._oTingData = {},
                this._gameView && this._gameView.autoSendOutCard(e)
            }
            return t
        }
        ,
        l.prototype.sendAutoCardBtn = function(e) {
            var t = new a.GNet_C_Message.GNet_C_AutoCard;
            return t._bIsAutoCard = e,
            this._GameFrame.sendNetMessage(t)
        }
        ,
        l.prototype.sendOperateCard = function(e, t, i) {
            var r = new a.GNet_C_Message.GNet_C_OperateCard;
            r._cbOperateCode = e;
            for (var o = 0; o < i; o++)
                r._cbOperateCard[o] = t[o];
            return this._GameFrame.sendNetMessage(r)
        }
        ,
        l.prototype.sendUserJiaPu = function(e) {
            var t = new a.GNet_C_Message.GNet_C_UserJiaPu;
            return t._lUserJiaPu = e,
            this._GameFrame.sendNetMessage(t)
        }
        ,
        l.prototype.removeHandCard = function(e, t) {
            if (e != this._nCurrentUser)
                return !1;
            if (this._nHandCardCount[e] <= 0)
                return !1;
            var a = !0;
            if (e == window.YC.GC.getPlayer()._wChairID) {
                a = !1;
                for (var r = 0; r < this._nHandCardCount[e]; r++)
                    if (this._nHandCardData[e][r] == t) {
                        this._nHandCardData[e][r] = 0,
                        a = !0;
                        break
                    }
                i.SortCardList(this._nHandCardData[e])
            }
            return 1 == a && (this._nHandCardCount[e]--,
            !0)
        }
        ,
        l.prototype.addHandCard = function(e, t) {
            if (this._nHandCardCount[e] >= a.MAX_COUNT)
                return !1;
            var i = !0;
            if (e == window.YC.GC.getPlayer()._wChairID) {
                i = !1;
                for (var r = 0; r < a.MAX_COUNT; r++)
                    if (0 == this._nHandCardData[e][r]) {
                        this._nHandCardData[e][r] = t,
                        i = !0;
                        break
                    }
            }
            return 0 != i && (this._nHandCardCount[e]++,
            !0)
        }
        ,
        l.prototype.updateUiUserInfo = function(e) {
            var t = this._GameFrame.getUser(e)
              , a = {};
            if (a.GameID = t._dwGameID,
            a.UserID = t._dwUserID,
            t._nTotalNumber) {
                a.ZongJuShu = t._nTotalNumber;
                var i = 0;
                t._nTotalNumber && (i = Math.floor(t._nWinNumber / t._nTotalNumber * 1e4) / 100),
                a.ShengLv = i + "%",
                a.LianSheng = t._nHighNumber,
                window.YC.GC.postEvent(n.EventID.GE_USER_UPDATE_INFO, a)
            }
        }
        ,
        l.prototype.getHuCardRemainingCount = function(e) {
            for (var t = 0, r = 0; r < a.GAME_PLAYER; r++)
                if (r == this.getMeChairId())
                    for (var o = 0; o < this._nHandCardCount[r]; o++)
                        this._nHandCardData[r][o] == e && (t += 1);
            for (r = 0; r < a.GAME_PLAYER; r++)
                for (o = 0; o < this._nWeaveCardCount[r]; o++)
                    if (r == this.getMeChairId() || this._nWeaveCardData[r][o]._cbParam != i.PARM.WIK_AN_GANG)
                        for (var n = this._nWeaveCardData[r][o]._cbCardData, s = this._nWeaveCardData[r][o]._cbCardCount, _ = 0; _ < s; _++)
                            n[_] == e && (t += 1);
            for (r = 0; r < a.GAME_PLAYER; r++)
                for (o = 0; o < this._nDiscardCount[r]; o++)
                    this._nDiscardCard[r][o] == e && (t += 1);
            return 4 - t
        }
        ,
        l.prototype.setAutoCardState = function(e) {
            this._bAutoCard = e,
            this._gameView && this._gameView.setAutoCardState(e)
        }
        ,
        l.prototype.setTingNodeVisible = function(e) {
            this._bTingNodeVisible = e,
            this._gameView && this._gameView.setTingNodeVisible(e),
            0 == e && 1 == this._bAutoCard && (cc.error("\u542c\u724c\u8282\u70b9\u5f02\u5e38\u5173\u95ed,\u81ea\u52a8\u51fa\u724c\u72b6\u6001\u5f00\u542f \u81ea\u52a8\u5173\u95ed\u5904\u7406"),
            o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_RULE_BAO_TING) || this.sendAutoCardBtn(!1))
        }
        ,
        l.prototype.getHandPromptCard = function(e, t) {
            if (0 != t)
                return i.getPromptCard(e, t);
            if (o._and(e, i.WIK.WIK_GANG)) {
                for (var a = !(0 != this._nDiscardCount[this.getMeChairId()] || !o._and(this.getGameInfo()._llGameRule, i.GAME_RULE.GAME_TYPE_XUAN_FENG_GANG)), r = i.getGangCardsList(this._nWeaveCardData[this.getMeChairId()], this._nWeaveCardCount[this.getMeChairId()], this._nHandCardData[this.getMeChairId()], this._nHandCardCount[this.getMeChairId()], this._m_NoCanGang, a), n = new Array, s = 0; s < r.length; s++)
                    for (var _ = 0; _ < r[s]._cbCardData.length; _++)
                        n[n.length] = r[s]._cbCardData[_];
                return n
            }
        }
        ,
        l.prototype.getCardData = function(e) {
            return i.copyArray(this._nHandCardData[e])
        }
        ,
        l.prototype.getCardCount = function(e) {
            return this._nHandCardCount[e]
        }
        ,
        l.prototype.getDiscardCard = function(e) {
            return i.copyArray(this._nDiscardCard[e])
        }
        ,
        l.prototype.getDiscardCount = function(e) {
            return this._nDiscardCount[e]
        }
        ,
        l.prototype.getWeaveCardData = function(e) {
            return i.copyArray(this._nWeaveCardData[e])
        }
        ,
        l.prototype.getWeaveCardCount = function(e) {
            return this._nWeaveCardCount[e]
        }
        ,
        l.prototype.getMeChairId = function() {
            var e = window.YC.GC.getPlayer()._wChairID;
            return (!e && 0 != e || e == r.INVALID_CHAIR) && (e = u.prototype.getMeChairId.apply(this)),
            e || 0 == e || cc.log("Check meChairId!"),
            e
        }
        ,
        l.prototype.getMeViewId = function() {
            return o.switchViewChairID(a.GAME_PLAYER, this.getMeChairId(), this.getMeChairId())
        }
        ,
        l.prototype.getUserItem = function(e) {
            for (var t = this.getTableUsers(), i = 0; i < a.GAME_PLAYER; i++)
                if (t[i] && t[i]._wChairID == e)
                    return t[i];
            return null
        }
        ,
        l.prototype.switchUserIdToChairId = function(e) {
            for (var t = this.getTableUsers(), i = 0; i < a.GAME_PLAYER; i++)
                if (t[i] && t[i]._dwUserID == e)
                    return t[i]._wChairID
        }
        ,
        l.prototype.playCardDataSound = function(e, t) {
            if (0 != i.isValidCard(t)) {
                var a = "";
                a = this.getGameSetValue(r.GameOptionString.GAME_ACCELERATE) == r.GameOptionResult.ON ? "quick" : this.getGameSetValue(r.GameOptionString.GAME_DIALECT) == r.GameOptionResult.OFF ? "putonghua" : "fangyan";
                var o;
                o = 0 == e ? "male" : "female";
                var n = "";
                switch (t & r.MASK_COLOR) {
                case 0:
                    n = "W_";
                    break;
                case 16:
                    n = "S_";
                    break;
                case 32:
                    n = "T_";
                    break;
                case 48:
                    n = "F_"
                }
                var s = t & r.MASK_VALUE;
                "quick" == a ? this.playEffect("sparrowpinghu/res/soundpinghu/" + a + "/" + o + "/" + n + s) : this.playEffect("client/res/game/common/sound/" + a + "/" + o + "/" + n + s)
            }
        }
        ,
        l.prototype.playActionSound = function(e, t) {
            if (cc.error(!e && 0 != e),
            t != i.WIK.WIK_NULL) {
                var a, o = "", n = "";
                if (a = 0 == e ? "male" : "female",
                this.getGameSetValue(r.GameOptionString.GAME_ACCELERATE) == r.GameOptionResult.ON)
                    switch (o = "quick",
                    t) {
                    case i.WIK.WIK_LEFT:
                    case i.WIK.WIK_CENTER:
                    case i.WIK.WIK_RIGHT:
                        n = "chi";
                        break;
                    case i.WIK.WIK_PENG:
                        n = "peng";
                        break;
                    case i.WIK.WIK_GANG:
                        n = "gang";
                        break;
                    case i.WIK.WIK_LISTEN:
                        n = "ting";
                        break;
                    case i.WIK.WIK_CHI_HU:
                        n = "hu";
                        break;
                    case i.WIK.WIK_ZI_MO:
                        n = "zimo";
                        break;
                    case i.WIK.WIK_LIANG_XI:
                        n = "liangxi"
                    }
                else {
                    o = this.getGameSetValue(r.GameOptionString.GAME_DIALECT) == r.GameOptionResult.OFF ? "putonghua" : "fangyan";
                    var s = Math.round(Math.random());
                    switch (t) {
                    case i.WIK.WIK_LEFT:
                    case i.WIK.WIK_CENTER:
                    case i.WIK.WIK_RIGHT:
                        n = "chi_" + s;
                        break;
                    case i.WIK.WIK_PENG:
                        n = "peng_" + s;
                        break;
                    case i.WIK.WIK_GANG:
                        n = "gang_" + s;
                        break;
                    case i.WIK.WIK_LISTEN:
                        n = "ting_" + (s = Math.floor(4 * Math.random()));
                        break;
                    case i.WIK.WIK_CHI_HU:
                        n = "hu_" + s;
                        break;
                    case i.WIK.WIK_ZI_MO:
                        n = "zimo_" + s;
                        break;
                    case i.WIK.WIK_LIANG_XI:
                        n = "liangxi"
                    }
                }
                "quick" == o ? this.playEffect("sparrowpinghu/res/soundpinghu/" + o + "/" + a + "/" + n) : this.playEffect("client/res/game/common/sound/" + o + "/" + a + "/" + n)
            }
        }
        ,
        l.prototype.playBackMusic = function() {
            h.getAudioComponent().playMusic("client/res/game/common/sound/bg")
        }
        ,
        l.prototype.stopBackMusic = function() {
            h.getAudioComponent().setMusicMute(!0)
        }
        ,
        l.prototype.playEffect = function(e) {
            h.getAudioComponent().playEffect(e)
        }
        ,
        l.prototype.sendVoice = function() {
            this.getGameSetValue(r.GameOptionString.GAME_SOUND_MUTE) == r.GameOptionResult.OFF && h.getAudioComponent().setAudioMute(!0),
            window.YC.GC.getTapingManager().startTap()
        }
        ,
        l.prototype.endVoice = function() {
            this.getGameSetValue(r.GameOptionString.GAME_SOUND_MUTE) == r.GameOptionResult.OFF && h.getAudioComponent().setAudioMute(!1),
            window.YC.GC.getTapingManager().endTap()
        }
        ,
        l.prototype.cancelVoice = function() {
            this.getGameSetValue(r.GameOptionString.GAME_SOUND_MUTE) == r.GameOptionResult.OFF && h.getAudioComponent().setAudioMute(!1),
            window.YC.GC.getTapingManager().cancelTap()
        }
        ,
        l.prototype.playVoice = function(e, t) {
            window.YC.GC.getTapingMgr().playVoice({
                _strVoiceServerID: e,
                _dwTargetUserID: t
            })
        }
        ,
        l.prototype.onStartTap = function() {}
        ,
        l.prototype.onTapError = function(e) {
            "timeShort" == e && window.YC.GC.postEvent(n.EventID.GE_UI_SHOW_NOTICE, "\u65f6\u95f4\u8fc7\u77ed")
        }
        ,
        l.prototype.onCompleteTap = function() {}
        ,
        l.prototype.onStartPlay = function(e) {
            var t = this.getMeChairId()
              , i = o.switchViewChairID(a.GAME_PLAYER, t, e._dwTargetUserID);
            cc.log("voice playVoice sServerId = " + e._strVoiceServerID + ", wMeChairId = " + t + ",dwTargetUserID_=" + e._dwTargetUserID),
            i == this.getMeViewId() && this._gameView.setVoiceFlag(!1),
            this._gameView.setPlayerTalk(i, !0)
        }
        ,
        l.prototype.onEndPlay = function(e) {
            var t = this.getMeChairId()
              , i = o.switchViewChairID(a.GAME_PLAYER, t, e._dwTargetUserID);
            cc.log("voice playVoice sServerId = " + e._strVoiceServerID + ", wMeChairId = " + t + ",dwTargetUserID_=" + e._dwTargetUserID),
            i == this.getMeViewId() && this._gameView.setVoiceFlag(!0),
            this._gameView.setPlayerTalk(i, !1)
        }
        ,
        l.prototype.initRecordData = function() {
            a.setRoomConfig(this._kindId),
            this.onInitData()
        }
        ,
        l.prototype.getGameInfo = function() {
            var e = u.prototype.getGameInfo.apply(this);
            return e || (e = u.prototype.getRecordOption.apply(this)),
            e || cc.log("Plese Check Option!"),
            e
        }
        ,
        l.prototype.getTableUsers = function() {
            var e = u.prototype.getTableUsers.apply(this);
            return e || (e = u.prototype.getRecordUsers.apply(this)),
            e || cc.log("Plese Check UserItem!"),
            e
        }
        ,
        l.prototype.getTableUser = function(e) {
            for (var t = this.getTableUsers(), a = 0; a < t.length; a++)
                if (t[a]._wChairID == e)
                    return t[a];
            return cc.error("getTableUser not find nChairID_:", e),
            t[0]
        }
        ,
        l.prototype.recordOutData = function(e, t) {
            0 == this.removeHandCard(window.YC.GC.getPlayer()._wChairID, e) && cc.log("\u624b\u724c\u5220\u9664\u5931\u8d25[%d]", e),
            this._nSendCard = 0,
            this._bEnableOutCard = !1,
            this._nCurrentUser = r.INVALID_CHAIR,
            this._nDiscardCard[this.getMeChairId()][this._nDiscardCount[this.getMeChairId()]++] = e,
            this.playCardDataSound(t, e),
            this._gameView && this._gameView.refreshHandCard(this.getMeChairId())
        }
        ,
        l.prototype.getGameSetValue = function(e) {
            var t = this.getGameDefaultValue();
            if (null != t[e])
                return window.YC.UserDefault.getKey(this.getGameInfo()._dwKindID + e, t[e]);
            cc.error("getGameSetValue() error GameOption== " + e)
        }
        ,
        l.prototype.getGameDefaultValue = function() {
            var e = new Array
              , t = r.GameOptionString
              , a = r.GameOptionResult;
            return e[t.GAME_TABLE_BACK] = a.GREEN,
            e[t.GAME_CARD_BACK] = a.GREEN,
            e[t.GAME_MUSIC] = a.OFF,
            e[t.GAME_VOICE] = a.ON,
            e[t.GAME_DIALECT] = a.OFF,
            e[t.GAME_SOUND_MUTE] = a.OFF,
            e[t.OUT_CARD_ENLARGE] = a.OFF,
            e[t.OUT_CARD_TYPE] = a.FALLING_DOWN,
            e[t.IN_CARD_SUCCINCT] = a.ON,
            e[t.GAME_SCENE] = a.GAME_SCENE_2D,
            e[t.CARD_FONT_SIZE] = a.BIG,
            e[t.GAME_ACCELERATE] = a.ON,
            e
        }
        ,
        t.exports = l,
        cc._RF.pop()
    }
    , {
        AudioManager: void 0,
        EventDefine: void 0,
        GameMode: void 0,
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        UIUserInfo: void 0,
        sparrowBigResultLayer: void 0,
        sparrowResultLayer: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuCreaterRoom: "sparrowpinghuCreaterRoom",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }],
    sparrowpinghuRecordHead: [function(e, t) {
        "use strict";
        cc._RF.push(t, "3de6bYR3z1EJpbSm8xkrZHP", "sparrowpinghuRecordHead");
        var a = function(e, t, a, i) {
            var r = new Array;
            if ("int" == a)
                for (var o = 0; o < e; o++)
                    r[o] = t.popInt();
            else if ("string" == a)
                for (var n = 0; n < e; n++)
                    r[n] = t.popString(i);
            else if ("char" == a)
                if (i)
                    for (var s = 0; s < e; s++) {
                        for (var _ = new Array, d = 0; d < i; d++) {
                            var c = t.popChar();
                            0 != c && (_[d] = c)
                        }
                        r[s] = _
                    }
                else
                    for (var h = 0; h < e; h++)
                        r[h] = t.popChar();
            else if ("byte" == a)
                if (i)
                    for (var C = 0; C < e; C++) {
                        _ = new Array;
                        for (var u = 0; u < i; u++)
                            _[u] = t.popByte();
                        r[C] = _
                    }
                else
                    for (var l = 0; l < e; l++)
                        r[l] = t.popByte();
            else if ("dword" == a)
                for (var g = 0; g < e; g++)
                    r[g] = t.popDword();
            else if ("long" == a)
                for (var p = 0; p < e; p++)
                    r[p] = t.popLong();
            else if ("bool" == a)
                for (var m = 0; m < e; m++)
                    r[m] = t.popBool();
            else if ("codeChar" == a && i)
                for (var I = 0; I < e; I++)
                    r[I] = t.popSingleString(i);
            return r
        };
        t.exports = {
            ToItemTable: function(e, t) {
                var i = {};
                return 2 == e ? (i.nSex = a(4, t, "int"),
                i.nScores = a(4, t, "int"),
                i.szNickNames = a(4, t, "string", 32),
                i.dwUserIDs = a(4, t, "dword"),
                i.szIconUrl = a(4, t, "codeChar", 256)) : 101 == e ? i.cbPuFen = a(4, t, "int") : 3 == e ? (i.wBankerUser = t.popWord(),
                i.wFirstBankerUser = t.popWord(),
                i.cbCardData = a(4, t, "byte", 14)) : 4 == e ? (i.wCurrentUser = t.popWord(),
                i.cbCardData = t.popByte()) : 5 == e ? (i.wCurrentUser = t.popWord(),
                i.cbCardData = t.popByte()) : 6 == e ? (i.cbActionMark = a(4, t, "dword"),
                i.cbActionCard = a(4, t, "byte")) : 37 == e ? (i.cbActionMark = t.popByte(),
                i.cbActionCard = a(4, t, "byte"),
                i.wOpertaUser = t.popWord()) : 38 == e ? (i.wOpertaUser = t.popWord(),
                i.cbActionMark = t.popByte()) : 100 == e ? (i.wOperateUserID = t.popWord(),
                i.dwOperateCode = t.popDword()) : 7 == e ? (i.wOptionUser = t.popWord(),
                i.wProvideUser = t.popWord(),
                i.cbActionMark = t.popByte(),
                i.cbActionCard = a(4, t, "byte"),
                i.cbActionCount = t.popByte(),
                i.dwChiHuRight = a(4, t, "dword"),
                i.cbActionType = t.popByte()) : 8 == e ? i.wChairID = t.popWord() : 10 == e ? (i.wProvideUser = t.popWord(),
                i.cbWeaveCard = t.popByte()) : 42 == e && (i.lCellScore = t.popInt(),
                i.lGameScore = a(4, t, "long"),
                i.lRevenue = a(4, t, "long"),
                i.wProvideUser = t.popWord(),
                i.cbProvideCard = t.popByte(),
                i.dwChiHuKind = a(4, t, "dword"),
                i.dwChiHuRight = a(4, t, "dword"),
                i.cbCardCount = a(4, t, "byte"),
                i.cbHandCardData = a(4, t, "byte", 14),
                i.bOpen = a(4, t, "bool"),
                i.wMaxRoundCount = t.popWord(),
                i.wCurrentRound = t.popWord(),
                i.cbminggang = a(4, t, "byte"),
                i.cbangang = a(4, t, "byte"),
                i.cbDianGangConut = a(4, t, "byte"),
                i.lGangScore = a(4, t, "long"),
                i.bGenZhuang = t.popBool(),
                i.wBankerUser = t.popWord(),
                i.cbQuanQiuRen = a(4, t, "bool"),
                i.cb_bDianGang = a(4, t, "bool"),
                i.cb_bMoGang = a(4, t, "bool"),
                i.cb_bAnGang = a(4, t, "bool"),
                i.cb_liangxinum = a(4, t, "int"),
                i.cbPuFen = a(4, t, "int"),
                i.bTing = a(4, t, "bool")),
                i
            },
            PlayerCount: 4,
            MaxHandCardCount: 14,
            enRecord_init_user: 2,
            enRecord_out_card: 5,
            enRecord_game_start_dispath_card: 3,
            enRecord_send_card: 4,
            enRecord_send_nodify_option: 6,
            enRecord_user_option_result: 7,
            enRecord_user_listen_result: 8,
            enRecord_game_refresh_weavecard: 10,
            enRecord_send_nodify_passiveoption: 37,
            enRecord_send_nodify_passiveoptionguo: 38,
            enRecord_game_conclude_yixian: 42,
            enRecord_user_operate_card: 100,
            enRecord_jia_pu: 101
        },
        cc._RF.pop()
    }
    , {}],
    sparrowpinghuRecordScene: [function(e, t) {
        "use strict";
        cc._RF.push(t, "5f364jlEDhPgZNVJk32CVtm", "sparrowpinghuRecordScene");
        var a = e("UIRecordScene")
          , i = (e("UIBase"),
        e("EventDefine"),
        e("GameScene"),
        e("sparrowpinghuRecordHead"))
          , r = e("sparrowpinghuCMD")
          , o = e("sparrowpinghuGameLogic")
          , n = e("UIVideo")
          , s = e("GlobalFunction");
        cc.Class({
            extends: a,
            show: function() {
                this._CMD = r,
                this._RecordHead = i,
                this._GameLogic = o,
                a.prototype.show.apply(this, arguments)
            },
            doProcess: function() {
                if (cc.log("playSpeed:  " + this.playSpeed),
                this._gameMode)
                    if (this.playPos != this.arrayItem.length - 1) {
                        this.playPos = this.playPos + 1;
                        var e = this.arrayItem[this.playPos]
                          , t = {};
                        if (e.nDataIndex == i.enRecord_game_start_dispath_card) {
                            var a = this.arrayItem[2].tItemData;
                            this.curUserID = window.YC.GC.getPlayer()._dwUserID;
                            for (var _ = 0; _ < a.dwUserIDs.length; _++)
                                a.dwUserIDs[_] > 0 && this.curUserID == a.dwUserIDs[_] && (this._wChairID = _);
                            var d = e.tItemData.wBankerUser;
                            this._wChairID || 0 == this._wChairID || (this._wChairID = d),
                            null != this._wChairID && window.YC.GC.getPlayer().setPlayerKeyByParam("_wChairID", this._wChairID);
                            var c = this.arrayItem[4].tItemData
                              , h = (c.wCurrentUser,
                            c.cbCardData)
                              , C = e.tItemData.cbCardData;
                            C[d][13] = h,
                            this.playPos = this.playPos + 1;
                            var u = 0
                              , l = this.arrayItem[5];
                            l && l.nDataIndex == i.enRecord_game_start_dispath_card && (u = l.tItemData.cbActionMark,
                            t._nActionCard = l.tItemData.cbActionCard,
                            this.playPos = this.playPos + 1),
                            t._cbUserAction = u,
                            t._wBankerUser = d,
                            t._wFirstBankerUser = e.tItemData.wFirstBankerUser,
                            t._wMaxRoundCount = this.arrayItem[1].tItemData.MaxNumJuShu,
                            t._wCurrentRound = this.arrayItem[1].tItemData.nLeftInning,
                            t._cbCardData = C,
                            this._gameMode.onSubGameStartData(t),
                            this.scheduleOnce(function() {
                                this.toStartTimer(),
                                window.YC.GC.getUIManager().show(n, this)
                            }, .5),
                            this.kGameView.initOperateButton(),
                            this.kGameView.freshRule(this.arrayItem[1].tItemData.dwCustomRule),
                            this.kGameView.freshRecordScore()
                        } else if (e.nDataIndex == i.enRecord_jia_pu)
                            t.cbPuFen = e.tItemData.cbPuFen,
                            this._gameMode.onSubStartPuFenData(t);
                        else if (e.nDataIndex == i.enRecord_out_card) {
                            if (this._wChairID == e.tItemData.wCurrentUser) {
                                t._cbOutCardData = e.tItemData.cbCardData;
                                var g = this.arrayItem[2].tItemData.nSex[this._wChairID];
                                this._gameMode.recordOutData(t._cbOutCardData, g),
                                this.kGameView._CardLayer.pushDisCard(r.MY_VIEWID, t._cbOutCardData)
                            } else {
                                var p = e.tItemData.wCurrentUser
                                  , m = e.tItemData.cbCardData;
                                t._wOutCardUser = p,
                                t._cbOutCardData = m,
                                this._gameMode.onSubOutCardData(t)
                            }
                            this.kGameView.hideGameButtons()
                        } else if (e.nDataIndex == i.enRecord_send_card) {
                            if (t._wSendCardUser = e.tItemData.wCurrentUser,
                            t._cbCardData = e.tItemData.cbCardData,
                            t._wActionMask = 0,
                            this._gameMode.onSubSendCardData(t),
                            this.kGameView.hideGameButtons(),
                            this.toOptionAction && this.toOptionAction.length > 0) {
                                for (var I = 0; I < r.GAME_PLAYER; I++)
                                    this.toOptionAction[I] > 0 && this.kGameView.showOprateFlag(I, o.WIK.WIK_NULL);
                                this.toOptionAction = []
                            }
                        } else if (e.nDataIndex == i.enRecord_send_nodify_option) {
                            var f = e.tItemData.cbActionMark;
                            this.toOptionAction = e.tItemData.cbActionMark,
                            t._wActionMask = f,
                            t._cbActionCard = e.tItemData.cbActionCard;
                            for (var w = 0; w < r.GAME_PLAYER; w++) {
                                var A = s.switchViewChairID(r.GAME_PLAYER, this._wChairID, w);
                                this.kGameView.showGameButtons(f[w], A)
                            }
                        } else if (e.nDataIndex == i.enRecord_send_nodify_passiveoption) {
                            f = e.tItemData.cbActionMark;
                            var E = e.tItemData.wOpertaUser;
                            A = s.switchViewChairID(r.GAME_PLAYER, this._wChairID, E),
                            this.kGameView.showGameButtons(f, A)
                        } else if (e.nDataIndex == i.enRecord_send_nodify_passiveoptionguo) {
                            if (E = e.tItemData.wOpertaUser,
                            e.tItemData.cbActionMark == o.WIK.WIK_NULL) {
                                var D = s.switchViewChairID(r.GAME_PLAYER, this._wChairID, E);
                                this.kGameView.showOprateFlag(E, o.WIK.WIK_NULL),
                                this.kGameView.hidePlayerButton(D),
                                this.toOptionAction && this.toOptionAction.length > 0 && (this.toOptionAction[E] = 0)
                            }
                        } else if (e.nDataIndex == i.enRecord_user_operate_card) {
                            var S = e.tItemData.wOperateUserID
                              , v = e.tItemData.dwOperateCode;
                            D = s.switchViewChairID(r.GAME_PLAYER, this._wChairID, S),
                            this.kGameView.setUserOperate(v, D)
                        } else if (e.nDataIndex == i.enRecord_user_option_result) {
                            this.toOptionAction = [];
                            var R = o.WIK;
                            if (R.WIK_CHI_HU & e.tItemData.cbActionMark || R.WIK_ZI_MO & e.tItemData.cbActionMark)
                                return;
                            t._wOperateCode = e.tItemData.cbActionMark,
                            t._wOperateUser = e.tItemData.wOptionUser,
                            t._cbOperateParam = e.tItemData.cbActionType,
                            t._wProvideUser = e.tItemData.wProvideUser,
                            h = e.tItemData.cbActionCard[0];
                            var G = e.tItemData.cbActionCount
                              , N = e.tItemData.cbActionMark
                              , M = new Array;
                            if (N == R.WIK_NULL)
                                return;
                            N & R.WIK_LEFT ? (M[0] = h,
                            M[1] = h + 1,
                            M[2] = h + 2,
                            M[3] = 0,
                            G = 3) : N & R.WIK_CENTER ? (M[0] = h - 1,
                            M[1] = h,
                            M[2] = h + 1,
                            M[3] = 0,
                            G = 3) : N & R.WIK_RIGHT ? (M[0] = h - 2,
                            M[1] = h - 1,
                            M[2] = h,
                            M[3] = 0,
                            G = 3) : N & R.WIK_PENG ? (M[0] = h,
                            M[1] = h,
                            M[2] = h,
                            M[3] = 0,
                            G = 3) : t._cbOperateParam == o.PARM.WIK_DIRECTION_GANG ? (M[0] = 49,
                            M[1] = 50,
                            M[2] = 51,
                            M[3] = 52,
                            G = 4) : t._cbOperateParam == o.PARM.WIK_ZFB_GANG ? (M[0] = 53,
                            M[1] = 54,
                            M[2] = 55,
                            G = 3) : N & R.WIK_GANG && (M[0] = h,
                            M[1] = h,
                            M[2] = h,
                            M[3] = h,
                            G = 4),
                            t._cbOperateCard = M,
                            t._cbOperateCardCount = G,
                            this._gameMode._nActionCard = h,
                            this._gameMode.onSubOperateResultData(t),
                            this.addWeaveArray(t._wOperateUser, M),
                            this.kGameView.hideGameButtons()
                        } else if (e.nDataIndex == i.enRecord_game_conclude_yixian) {
                            t._lGameScore = e.tItemData.lGameScore,
                            t._wCurrentRound = e.tItemData.wCurrentRound,
                            t._wMaxRoundCount = e.tItemData.wMaxRoundCount,
                            t._wProvideUser = e.tItemData.wProvideUser,
                            t._bIsBigResult = !1,
                            t._cbProvideCard = e.tItemData.cbProvideCard,
                            t._dwChiHuKind = e.tItemData.dwChiHuKind,
                            t._dwChiHuRight = e.tItemData.dwChiHuRight,
                            t._cbCardCount = e.tItemData.cbCardCount,
                            t._cbWeaveItemCount = {},
                            t._wBankerUser = e.tItemData.wBankerUser,
                            t._bGenZhuang = e.tItemData.bGenZhuang,
                            t._bOpen = e.tItemData.bOpen,
                            t._cbminggang = e.tItemData.cbminggang,
                            t._cbangang = e.tItemData.cbangang,
                            t._cbDianGangConut = e.tItemData.cbDianGangConut,
                            t._lGangScore = e.tItemData.lGangScore,
                            t._WeaveItemArray = this.weaveArray,
                            t._cbHandCardData = e.tItemData.cbHandCardData,
                            t._bRecord = !0,
                            t._cbQuanQiuRen = e.tItemData.cbQuanQiuRen,
                            t.cb_bDianGang = e.tItemData.cb_bDianGang,
                            t.cb_bMoGang = e.tItemData.cb_bMoGang,
                            t.cb_bAnGang = e.tItemData.cb_bAnGang,
                            t.cb_liangxinum = e.tItemData.cb_liangxinum,
                            t.cbPuFen = e.tItemData.cbPuFen,
                            t._bTing = e.tItemData.bTing;
                            for (var b = 0; b < r.GAME_PLAYER; b++) {
                                for (var y = 0, O = 0; O < 4; O++) {
                                    var T = this.weaveArray[b][O];
                                    T && T.cbCardData && 0 != T.cbCardData && y++
                                }
                                t._cbWeaveItemCount[b] = y
                            }
                            t.bRecord = !0,
                            t._bNaturalConclude = !0,
                            this._gameMode.onSubGameConcludeData(t)
                        } else if (e.nDataIndex == i.enRecord_user_listen_result)
                            t.wChairID = e.tItemData.wChairID,
                            this._gameMode.onSubListionOperate(t);
                        else if (e.nDataIndex == i.enRecord_game_refresh_weavecard) {
                            t._wProvideUser = e.tItemData.wProvideUser,
                            t._cbWeaveCard = e.tItemData.cbWeaveCard,
                            this._gameMode.onSubRefreshWeaveCardData(t);
                            var P = this.weaveArray[t._wProvideUser];
                            if (P)
                                for (var L = 0; L < P.length; L++)
                                    if (P[L].cbCardData[0] == e.tItemData.cbWeaveCard && P[L].cbCardData[1] == e.tItemData.cbWeaveCard && P[L].cbCardData[2] == e.tItemData.cbWeaveCard && P[L].cbCardData[3] == e.tItemData.cbWeaveCard) {
                                        this.weaveArray[t._wProvideUser][L].cbCardData[3] = 0;
                                        break
                                    }
                        }
                    } else
                        this.endProcess()
            }
        }),
        cc._RF.pop()
    }
    , {
        EventDefine: void 0,
        GameScene: void 0,
        GlobalFunction: void 0,
        UIBase: void 0,
        UIRecordScene: void 0,
        UIVideo: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic",
        sparrowpinghuRecordHead: "sparrowpinghuRecordHead"
    }],
    sparrowpinghuViewRecord: [function(e, t) {
        "use strict";
        cc._RF.push(t, "e4c9aaXst1E/LPoA7GTA1Dy", "sparrowpinghuViewRecord");
        var a = e("sparrowpinghuView")
          , i = e("sparrowpinghuCMD")
          , r = e("GlobalFunction")
          , o = e("GlobalDefine")
          , n = e("sparrowpinghuGameLogic")
          , s = e("sparrowpinghuCardNode")
          , _ = e("sparrowpinghuCreaterRoom")
          , d = e("sparrowpinghuGameConfig").cardConfig
          , c = o.UserDirection
          , h = new Array;
        h[i.DIRECTION_NORTH] = cc.v2(-300, 350),
        h[i.DIRECTION_WEST] = cc.v2(-520, -100),
        h[i.DIRECTION_SOUTH] = cc.v2(515, -355),
        h[i.DIRECTION_EAST] = cc.v2(525, 250),
        cc.Class({
            extends: a,
            onGameStart: function(e, t, a) {
                var o = this
                  , n = this._gameMode._nCurrentRound
                  , s = this._gameMode._nMaxRoundCount;
                this.roomRound.getComponent(cc.Label).string = n + "/" + s + "\u5c40",
                this.currentRound.getComponent(cc.Label).string = n + "/" + s,
                this.centerNode.active = !0,
                this.btnStart.active = !1,
                this.btnCurrentResult.active = !1,
                this.btnInvite.active = !1,
                this.btnDismiss.active = !1;
                var _ = i.GAME_PLAYER;
                this._CardLayer.node.pauseSystemEvents(!0);
                for (var d = 0; d < i.GAME_PLAYER; d++)
                    this.setPlayerBanker(d, !1);
                this.onGameStartAction(function() {
                    for (var n = 0; n < i.GAME_PLAYER; n++) {
                        var s = r.switchViewChairID(i.GAME_PLAYER, o._gameMode.getMeChairId(), n);
                        r.switchViewIDToDirection(i.GAME_PLAYER, s),
                        n == o._gameMode._nBankerUser && o.setPlayerBanker(s, !0),
                        o.sendCardAction(s, e[n], t[n], o._gameMode.getMeChairId(), function() {
                            --_ <= 0 && a()
                        })
                    }
                    o.leftCardCount.getComponent(cc.Label).string = o._gameMode._LeftCardCount
                }, this);
                var c = r.switchViewChairID(i.GAME_PLAYER, o._gameMode.getMeChairId(), o._gameMode._nFirstBankerUser);
                o.setPlayerRoomHost(c, !0),
                o.setTimeLayerDirection(c),
                o.setDirection(r.switchViewChairID(i.GAME_PLAYER, o._gameMode.getMeChairId(), o._gameMode._nBankerUser))
            },
            sendCardAction: function(e, t, a, i, r) {
                this._CardLayer.setHandCard(e, t, a),
                this._CardLayer.node.resumeSystemEvents(!0),
                r()
            },
            initOperateButton: function() {},
            hideGameButtons: function() {
                if (null != this._gameBtnInfo)
                    if (null != this._gameBtnInfo._node) {
                        this._gameBtnInfo._show = !1,
                        this._gameBtnInfo._node.active = !1;
                        for (var e = 0; e < 7; e++)
                            for (var t = 0; t < i.GAME_PLAYER; t++) {
                                var a = this.OperationList[e][t].getChildByName("optHand");
                                a && (a.active = !1),
                                this.OperationList[e][t].active = !1
                            }
                    } else
                        this._gameBtnInfo._show = !1
            },
            initGameButtons: function() {
                var e = this;
                if (null != this._gameBtnInfo._node) {
                    this.OperationList = new Array;
                    for (var t = [this._gameBtnInfo._node.getChildByName("btn_eat"), this._gameBtnInfo._node.getChildByName("btn_bump"), this._gameBtnInfo._node.getChildByName("btn_bridge"), this._gameBtnInfo._node.getChildByName("btn_liangxi"), this._gameBtnInfo._node.getChildByName("btn_listen"), this._gameBtnInfo._node.getChildByName("btn_win"), this._gameBtnInfo._node.getChildByName("btn_pass")], a = function(a) {
                        e.OperationList[a] = new Array;
                        for (var o = function(o) {
                            n = r.switchViewChairID(i.GAME_PLAYER, e._gameMode.getMeChairId(), o),
                            s = r.switchViewIDToDirection(i.GAME_PLAYER, n),
                            _ = cc.instantiate(t[a]),
                            d = a == t.length - 1,
                            _.scale = d ? .8 : .6,
                            s == i.DIRECTION_NORTH ? (_.y = 370,
                            _.x = -100) : s == i.DIRECTION_WEST ? _.x = -800 : s == i.DIRECTION_SOUTH ? _.y = 0 : s == i.DIRECTION_EAST && (_.x = 50),
                            e._gameMode.loadRes("client/res/game/common/texture/xiaoshou", cc.SpriteFrame, function(e, t) {
                                if (e)
                                    cc.log(e);
                                else {
                                    var n = r.switchViewChairID(i.GAME_PLAYER, this._gameMode.getMeChairId(), o)
                                      , s = r.switchViewIDToDirection(i.GAME_PLAYER, n)
                                      , _ = new cc.Node("optHand");
                                    _.addComponent(cc.Sprite).spriteFrame = t._res,
                                    s == i.DIRECTION_NORTH ? (_.y = -85,
                                    _.x = 25) : s == i.DIRECTION_WEST ? (_.y = 35,
                                    _.x = 75,
                                    _.angle = 90) : s == i.DIRECTION_SOUTH ? (_.y = 90,
                                    _.x = -45,
                                    _.angle = 180) : s == i.DIRECTION_EAST && (_.y = -35,
                                    _.x = -100,
                                    _.angle = 270),
                                    _.active = !1,
                                    _.parent = this.OperationList[a][n]
                                }
                            }
                            .bind(e)),
                            t[a].active = !1,
                            _.active = !1,
                            e.OperationList[a][n] = _,
                            e._gameBtnInfo._node.addChild(_)
                        }, c = 0; c < i.GAME_PLAYER; c++)
                            o(c)
                    }, o = 0; o < 7; o++) {
                        var n, s, _, d;
                        a(o)
                    }
                }
            },
            hidePlayerButton: function(e) {
                for (var t = 0; t < 7; t++) {
                    var a = this.OperationList[t][e].getChildByName("optHand");
                    a && (a.active = !1),
                    this.OperationList[t][e].active = !1
                }
            },
            showGameButtons: function(e, t) {
                null != this._gameBtnInfo ? null != this._gameBtnInfo._node ? (this._gameBtnInfo._show = !0,
                this._gameBtnInfo._node.active = !0,
                this.recognizecbActionMask(e, t)) : this._gameBtnInfo._show = !0 : this.loadNodeLayer("_gameBtnInfo", this._GameButtonsNodeInfo.ResPath, this._GameButtonsNodeInfo.zIndex, function() {
                    this.initGameButtons(),
                    this.recognizecbActionMask(e, t)
                }
                .bind(this))
            },
            recognizecbActionMask: function(e, t) {
                if (e == n.WIK.WIK_NULL)
                    return !1;
                var a = r.switchViewIDToDirection(i.GAME_PLAYER, t)
                  , o = this.OperationList[6][t];
                o.active = !0;
                var s = o.x
                  , _ = o.y
                  , d = 0;
                return e & (n.WIK.WIK_ZI_MO | n.WIK.WIK_CHI_HU) && (d++,
                this.setOperatePosition(5, a, t, s, _, d)),
                e & n.WIK.WIK_LISTEN && (d++,
                this.setOperatePosition(4, a, t, s, _, d)),
                e & n.WIK.WIK_LIANG_XI && (d++,
                this.setOperatePosition(3, a, t, s, _, d)),
                e & n.WIK.WIK_GANG && (d++,
                this.setOperatePosition(2, a, t, s, _, d)),
                e & n.WIK.WIK_PENG && (d++,
                this.setOperatePosition(1, a, t, s, _, d)),
                e & (n.WIK.WIK_RIGHT | n.WIK.WIK_CENTER | n.WIK.WIK_LEFT) && (d++,
                this.setOperatePosition(0, a, t, s, _, d)),
                !0
            },
            setUserOperate: function(e, t) {
                var a;
                0 != e ? (e & (n.WIK.WIK_ZI_MO | n.WIK.WIK_CHI_HU | n.WIK.WIK_MOBAO) && (a = this.OperationList[5][t].getChildByName("optHand")) && (a.active = !0),
                e & n.WIK.WIK_LISTEN && (a = this.OperationList[4][t].getChildByName("optHand")) && (a.active = !0),
                e & n.WIK.WIK_LIANG_XI && (a = this.OperationList[3][t].getChildByName("optHand")) && (a.active = !0),
                e & n.WIK.WIK_GANG && (a = this.OperationList[2][t].getChildByName("optHand")) && (a.active = !0),
                e & n.WIK.WIK_PENG && (a = this.OperationList[1][t].getChildByName("optHand")) && (a.active = !0),
                e & (n.WIK.WIK_RIGHT | n.WIK.WIK_CENTER | n.WIK.WIK_LEFT) && (a = this.OperationList[0][t].getChildByName("optHand")) && (a.active = !0)) : (a = this.OperationList[6][t].getChildByName("optHand")) && (a.active = !0)
            },
            setOperatePosition: function(e, t, a, r, o, n) {
                var s = this.OperationList[e][a];
                s.active = !0,
                t == i.DIRECTION_NORTH ? s.x = r - 85 * n : t == i.DIRECTION_WEST ? s.y = o + 85 * n : t == i.DIRECTION_SOUTH ? s.x = r - 85 * n : t == i.DIRECTION_EAST && (s.y = o + 85 * n)
            },
            freshRule: function(e) {
                var t = new cc.Node("recordText")
                  , a = t.addComponent(cc.Label);
                t.setContentSize(600, 300),
                a.fontSize = 25,
                a.lineHeight = 30,
                a.overflow = cc.Label.Overflow.CLAMP,
                a.enableWrapText = !0,
                t.color = new cc.color(0,0,0,255);
                var i = _.prototype.getGameRulesStr(e).join(" ");
                a.string = i,
                this.node.addChild(t)
            },
            freshRecordScore: function() {
                for (var e = this._gameMode.getTableUsers(), t = 0; t < i.GAME_PLAYER; t++) {
                    var a = e[t]._nScores
                      , o = r.switchViewChairID(i.GAME_PLAYER, this._gameMode.getMeChairId(), e[t]._wChairID);
                    this.setPlayerScore(o, a)
                }
            },
            init: function() {
                cc.log("GameView");
                var e = this;
                switch (this.myItem = this._gameMode.getMeItem(),
                this._CardLayer = this.node.getChildByName("node_Card").getComponent("sparrowpinghuCard"),
                this._CardLayer || (this._CardLayer = this.node.getChildByName("node_Card").addComponent("sparrowpinghuCard")),
                e._CardLayer.createHandCard = function(t) {
                    if (0 == n.isValidViewId(t))
                        return cc.error("createHandCard() error nViewID_[%d]", t),
                        !1;
                    var a = r.switchViewIDToDirection(i.GAME_PLAYER, t)
                      , o = d.getRecordHandCardConfig(a)
                      , _ = new cc.Node;
                    _.setPosition(d.getRecordHandCardNodePos(a)),
                    e._CardLayer.node.addChild(_);
                    for (var c = 0; c < i.MAX_COUNT; c++) {
                        var h = e._CardLayer._oCreateCard.createHandCardSpr(a, null);
                        h.addComponent(s),
                        _.addChild(h),
                        h.active = !1,
                        h.getComponent(s).setCardIndex(c),
                        h.name = "handCard_" + t + "_index_" + c,
                        a == i.DIRECTION_NORTH ? 0 == c ? h.setPosition(c * (o.size.width + o.posOffsetX) - o.sendCardSpace, 0) : h.setPosition(c * (o.size.width + o.posOffsetX), 0) : a == i.DIRECTION_WEST ? (0 == c ? h.setPosition(0, c * (o.size.height + o.posOffsetY) - o.sendCardSpace) : h.setPosition(0, c * (o.size.height + o.posOffsetY)),
                        h.zIndex = 1e3 - c) : a == i.DIRECTION_SOUTH ? (0 == c ? h.setPosition(-c * (o.size.width + o.posOffsetX) + o.sendCardSpace, 0) : h.setPosition(-c * (o.size.width + o.posOffsetX), 0),
                        h.getComponent(s).setCardTouchState(0)) : a == i.DIRECTION_EAST && (0 == c ? h.setPosition(0, -c * (o.size.height + o.posOffsetY) + o.sendCardSpace) : h.setPosition(0, -c * (o.size.height + o.posOffsetY)))
                    }
                    return _
                }
                ,
                e._CardLayer.init = function() {
                    d.setCardFontSize(this._oGameView._gameMode.getGameSetValue(o.GameOptionString.CARD_FONT_SIZE)),
                    d.setCardBackColor(this._oGameView._gameMode.getGameSetValue(o.GameOptionString.GAME_CARD_BACK)),
                    e._CardLayer._bRunActMoveHandCard = !1;
                    for (var t = 0; t < i.GAME_PLAYER; t++)
                        e._CardLayer._oWeaCardNode[t] = e._CardLayer.createWeaCard(t),
                        e._CardLayer._oWeaCard[t] = new Array,
                        e._CardLayer._oGameEndHandCardNode[t] = e._CardLayer.createGameEndHandCard(t),
                        e._CardLayer._oHandCardNode[t] = e._CardLayer.createHandCard(t),
                        e._CardLayer._oDisCardNode[t] = e._CardLayer.createDisCard(t),
                        e._CardLayer._oDisCard[t] = new Array,
                        e._CardLayer._nPLActionState[t] = new Array;
                    for (t = 0; t < i.GAME_PLAYER; t++)
                        e._CardLayer._oPublicCardNode[t] = e._CardLayer.createPublicCard(t),
                        e._CardLayer._outCardActionState[t] = 3;
                    e._CardLayer.initScreenFit()
                }
                ,
                this._CardLayer._oCreateCard = this._CardLayer.getComponent("sparrowpinghuCreateCard"),
                e._CardLayer._oCreateCard.createHandCardSpr = function(e, t) {
                    var a = new cc.Node
                      , i = a.addComponent(cc.Sprite)
                      , r = d.getRecordHandCardConfig(e);
                    if (e == c.DIRECTION_NORTH ? (a._anchorPoint = cc.v2(1, 1),
                    i.spriteFrame = this._CardBackAtlas.getSpriteFrame("DisCard_S"),
                    a._resName = "DisCard_S") : e == c.DIRECTION_WEST ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W"),
                    a._anchorPoint = cc.v2(0, 1),
                    a._resName = "WeaCard_W") : e == c.DIRECTION_SOUTH ? (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("HandCard"),
                    a._anchorPoint = cc.v2(0, 0),
                    a._resName = "HandCard") : e == c.DIRECTION_EAST && (i.spriteFrame = this._CardBackAtlas.getSpriteFrame("WeaCard_W"),
                    a._anchorPoint = cc.v2(1, 0),
                    a._resName = "WeaCard_W"),
                    i.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                    a.width = r.size.width,
                    a.height = r.size.height,
                    1 == n.isValidCard(t)) {
                        var o = this.createHandCardFont(t);
                        o.setPosition(a.width / 2, a.height / 2 - 10),
                        a.addChild(o)
                    }
                    return a
                }
                ,
                this._CardLayer.setGameView(this),
                this._CardLayer.setCardFontAtlas(this._gameMode.getResFromResList(this._gameMode.geaCardFontResPath())),
                this._CardLayer.setCardBackAtlas(this._gameMode.getResFromResList(this._gameMode.geaCardBackResPath())),
                this._CardLayer.init(),
                this.initRoomInfo(),
                this.initPlayerList(),
                this.changeBackGround(),
                this.loadAnimRes(),
                window.YC.UserDefault.getKey(this._gameMode.getGameInfo()._dwKindID + o.GameOptionString.GAME_TABLE_BACK, o.GameOptionResult.GREEN)) {
                case "Blue":
                    this.background[0].active = !0;
                    break;
                case "Green":
                    this.background[1].active = !0;
                    break;
                case "Qing":
                    this.background[2].active = !0;
                    break;
                case "Purple":
                    this.background[3].active = !0
                }
                this.userItem = this._gameMode.getTableUsers();
                for (var t = 0; t < this.userItem.length; t++)
                    this.onUserJoinRoom(this.userItem[t]);
                this.refreshView(),
                e._CardLayer.setHandCard = function(t, a, _) {
                    if (0 == n.isValidViewId(t))
                        return cc.error("setHandCard() error nViewID_[%d]", t),
                        !1;
                    var c = this.convetWeavePosToHandPos(t, this.getWeaCardEndPos(t))
                      , h = r.switchViewIDToDirection(i.GAME_PLAYER, t);
                    e._CardLayer.rectifyControl();
                    var C = d.getRecordHandCardConfig(h)
                      , u = n.copyArray(e._CardLayer._oHandCardNode[t].children);
                    u.sort(e._CardLayer.cardCompare);
                    var l = e._CardLayer._oHandCardNode[t].childrenCount
                      , g = o.INVALID_CHAIR;
                    e._CardLayer._oGameView._gameMode._nCurrentUser != o.INVALID_CHAIR && (g = r.switchViewChairID(i.GAME_PLAYER, e._CardLayer._oGameView._gameMode.getMeChairId(), e._CardLayer._oGameView._gameMode._nCurrentUser));
                    for (var p = 0; p < l; p++)
                        u[p].active = !1,
                        u[p].getComponent(s).setCardData(0);
                    for (p = 0; p < _; p++) {
                        var m = _ - 1 - p;
                        if (g != t && (m = _ - p),
                        m < 0 || m >= i.MAX_COUNT)
                            cc.log("\u975e\u6cd5index[%d]", m);
                        else if (u[m].active = !0,
                        a && 0 != a[p] && 1 == n.isValidCard(a[p])) {
                            u[m].getComponent(s).setCardData(a[p]);
                            var I = u[m].getChildByName("CardFont");
                            null != I && u[m].removeChild(I),
                            (I = this._oCreateCard.createHandCardFont(a[p])).active = !0,
                            I.scale = C.fontScale,
                            h == i.DIRECTION_SOUTH ? (I.setPosition(C.size.width / 2 + C.fontPosOffsetX, C.size.height / 2 + C.fontPosOffsetY),
                            u[m].x = 0 == m ? c.x + p * (u[m].width + C.posOffsetX) + C.weaveSpace + C.sendCardSpace : c.x + p * (u[m].width + C.posOffsetX) + C.weaveSpace) : h == i.DIRECTION_NORTH ? (I.setPosition(-(C.size.width / 2 + C.fontPosOffsetX), -(C.size.height / 2 + C.fontPosOffsetY)),
                            u[m].x = 0 == m ? c.x - (p * (u[m].width + C.posOffsetX) + C.weaveSpace + C.sendCardSpace) : c.x - (p * (u[m].width + C.posOffsetX) + C.weaveSpace)) : h == i.DIRECTION_WEST ? (I.setPosition(C.size.width / 2 + C.fontPosOffsetX, -(C.size.height / 2 + C.fontPosOffsetY)),
                            I.angle = -90) : h == i.DIRECTION_EAST && (I.setPosition(-(C.size.width / 2 + C.fontPosOffsetX), +(C.size.height / 2 + C.fontPosOffsetY)),
                            I.angle = 90),
                            I.name = "CardFont",
                            u[m].addChild(I)
                        }
                    }
                }
                ,
                e._CardLayer._oCreateCard.createWeaCard = function(e, t, a, r) {
                    var o = new cc.Node
                      , n = d.getWeaveCardConfig(e);
                    e == i.DIRECTION_NORTH ? (o._anchorPoint = cc.v2(1, 1),
                    o.width = n.size.width * (a > 3 ? 3 : a),
                    o.height = n.size.height) : e == i.DIRECTION_WEST ? (o._anchorPoint = cc.v2(0, 1),
                    o.width = n.size.width,
                    o.height = n.size.height * (a > 3 ? 3 : a)) : e == i.DIRECTION_SOUTH ? (o._anchorPoint = cc.v2(0, 0),
                    o.width = n.size.width * (a > 3 ? 3 : a),
                    o.height = n.size.height) : e == i.DIRECTION_EAST && (o._anchorPoint = cc.v2(1, 0),
                    o.width = n.size.width,
                    o.height = n.size.height * (a > 3 ? 3 : a));
                    for (var s = 0; s < a; s++) {
                        var _;
                        _ = 3 != s || r;
                        var c = this.createOneWeaCard(e, t[s], _);
                        e == i.DIRECTION_NORTH ? (s < 3 ? c.setPosition(-(c.width + n.posOffsetX) * s, 0) : c.setPosition(1 * -(c.width + n.posOffsetX), 10),
                        c.zIndex = s) : e == i.DIRECTION_WEST ? s < 3 ? (c.setPosition(0, -(c.height + n.posOffsetY) * s),
                        c.zIndex = s) : (c.setPosition(0, 1 * -(c.height + n.posOffsetY) + 14),
                        c.zIndex = 10) : e == i.DIRECTION_SOUTH ? (s < 3 ? c.setPosition((c.width + n.posOffsetX) * s, 0) : c.setPosition(1 * (c.width + n.posOffsetX), 24),
                        c.zIndex = s) : e == i.DIRECTION_EAST && (s < 3 ? (c.setPosition(0, (c.height + n.posOffsetY) * s),
                        c.zIndex = 10 - s) : (c.setPosition(0, 1 * (c.height + n.posOffsetY) + 14),
                        c.zIndex = 10)),
                        o.addChild(c)
                    }
                    return o
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuCardNode: "sparrowpinghuCardNode",
        sparrowpinghuCreaterRoom: "sparrowpinghuCreaterRoom",
        sparrowpinghuGameConfig: "sparrowpinghuGameConfig",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic",
        sparrowpinghuView: "sparrowpinghuView"
    }],
    sparrowpinghuView: [function(e, t) {
        "use strict";
        cc._RF.push(t, "ff2adZz6OVBTYwAC6M5b2Vh", "sparrowpinghuView");
        var a = e("EventDefine")
          , i = e("GlobalDefine")
          , r = e("sparrowpinghuGameLogic")
          , o = e("GlobalFunction")
          , n = e("GameView")
          , s = e("sparrowpinghuCreaterRoom")
          , _ = e("sparrowpinghuCMD")
          , d = e("sparrowSetLayer")
          , c = e("UIChatWC")
          , h = e("UIUserInfo")
          , C = e("GameRuleLayer")
          , u = e("sparrowpinghuCard")
          , l = e("sparrowpinghuGameConfig").cardConfig
          , g = e("UIStartCountDown");
        cc.Class({
            extends: n,
            properties: {},
            ctor: function() {
                this._GPSNodeInfo = {},
                this._GPSNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_gps",
                this._GPSNodeInfo.zIndex = -9,
                this._ChooseNodeInfo = {},
                this._ChooseNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_choose",
                this._ChooseNodeInfo.zIndex = null,
                this._TingNodeInfo = {},
                this._TingNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_ting",
                this._TingNodeInfo.zIndex = null,
                this._HuCardNodeInfo = {},
                this._HuCardNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_hucard",
                this._HuCardNodeInfo.zIndex = null,
                this._LuYinNodeInfo = {},
                this._LuYinNodeInfo.ResPath = "client/res/game/common/prefabs/node_luyin",
                this._LuYinNodeInfo.zIndex = null,
                this._SpecialCardNodeInfo = {},
                this._SpecialCardNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_specialcard",
                this._SpecialCardNodeInfo.zIndex = null,
                this._SetNodeInfo = {},
                this._SetNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_menu",
                this._SetNodeInfo.zIndex = null,
                this._GameButtonsNodeInfo = {},
                this._GameButtonsNodeInfo.ResPath = "client/res/game/sparrow/prefabs/node_gameBtn",
                this._GameButtonsNodeInfo.zIndex = null,
                this._PuFenNodeInfo = {},
                this._PuFenNodeInfo.ResPath = "sparrowpinghu/res/node_pufen",
                this._PuFenNodeInfo.zIndex = null
            },
            onLoad: function() {
                cc.log("GameView onLoad()");
                var e = this;
                e.changeDuration = 0,
                e.bBtnBgOut = !0,
                e.isRunningAction = !1,
                e._trimRotation = 0,
                e.positionFree = [cc.v2(38, 158), cc.v2(-318, -142), cc.v2(38, -32), cc.v2(318, -142)],
                e.positionFree_2Play = [],
                e.positionFree_2Play[_.DIRECTION_NORTH] = cc.v2(5, 160),
                e.positionFree_2Play[_.DIRECTION_SOUTH] = cc.v2(5, -60),
                e.positionGame = [cc.v2(365, 320), cc.v2(-590, 86), cc.v2(-590, -140), cc.v2(560, 86)],
                e.positionGps = [cc.v2(0, 221), cc.v2(-315, -101), cc.v2(0, -10), cc.v2(315, -101)];
                var t = [cc.v2(0, 0), cc.v2(25, 0), cc.v2(25, 0), cc.v2(-5, 0)];
                if (cc.view.getCanvasSize().width < i.NORMAL_WIDTH && 1 == cc.sys.isMobile)
                    for (var a = 0; a < e.positionGame.length; ++a)
                        e.positionGame[a].x = e.positionGame[a].x + t[a].x;
                e.positionAnimation = [cc.v2(0, 248), cc.v2(-372, 117), cc.v2(0, -146), cc.v2(345, 117)];
                var r = this.node;
                e.backgroundNode = r.getChildByName("background"),
                e.backgroundNode.zIndex = -10,
                e.background = e.backgroundNode.getChildByName("sp_bg"),
                e.roomInfo = e.backgroundNode.getChildByName("txt_roomInfo"),
                window.YC.GC.getResManager().load("sparrowpinghu/res/JPtishi", cc.SpriteFrame, function(t, a) {
                    e.waitJiaPuNode = new cc.Node,
                    e.waitJiaPuNode.parent = e.node,
                    e.waitJiaPuNode.active = !1,
                    e.waitJiaPuNode.addComponent(cc.Sprite).spriteFrame = a
                }),
                e.roomInfoNode = r.getChildByName("node_roomInfo"),
                e.roomID = e.roomInfoNode.getChildByName("txt_roomID"),
                e.delay = e.roomInfoNode.getChildByName("txt_delay"),
                e.roomRound = e.roomInfoNode.getChildByName("txt_curRound"),
                e.centerNode = r.getChildByName("node_center"),
                e.centerNode.active = !1,
                e.currentRound = e.centerNode.getChildByName("sp_leftBg").getChildByName("txt_currentJu"),
                e.leftCardCount = e.centerNode.getChildByName("sp_rightBg").getChildByName("txt_leftCardCount"),
                e.leftCardCount.getComponent(cc.Label).string = _.MAX_REPERTORY,
                e.direction = e.centerNode.getChildByName("directionBg"),
                e.directionNorth = e.direction.getChildByName("direction_north"),
                e.directionEast = e.direction.getChildByName("direction_east"),
                e.directionSouth = e.direction.getChildByName("direction_south"),
                e.directionWest = e.direction.getChildByName("direction_west"),
                e.btnNode = r.getChildByName("node_menubtn"),
                e.btnMenu = e.btnNode.getChildByName("btn_menu"),
                e.btnMenu.on(cc.Node.EventType.TOUCH_END, function() {
                    e.showMenu()
                }),
                e.btnGPS = e.btnNode.getChildByName("btn_gps"),
                e.btnGPS.setPosition(595, -10),
                e.btnGPS.on(cc.Node.EventType.TOUCH_END, function() {
                    e.onClickGpsBtn()
                }),
                e.btnGPS.active = !1,
                e.btnChat = e.btnNode.getChildByName("btn_chat"),
                e.btnChat.setPosition(595, -190),
                e.btnChat.on(cc.Node.EventType.TOUCH_END, function() {
                    if (Math.abs(e.ChatProgressBar.progress) <= 1e-5) {
                        var t = e._gameMode.getGameInfo();
                        window.YC.GC.getUIManager().show(c, parseInt(t._dwKindID))
                    }
                }),
                e.btnChat.active = !1,
                e.ChatProgressBar = e.btnChat.getChildByName("Background").getComponent(cc.ProgressBar),
                e.ChatProgressBar.progress = 0,
                e.btnVoice = e.btnNode.getChildByName("btn_voice"),
                e.btnVoice.on(cc.Node.EventType.TOUCH_START, function() {
                    cc.log("voice start"),
                    e.showRecordVoice(),
                    e._gameMode.sendVoice()
                }),
                e.btnVoice.on(cc.Node.EventType.TOUCH_END, function() {
                    cc.log("voice end"),
                    e.hideRecordVoice(),
                    e._gameMode.endVoice()
                }),
                e.btnVoice.on(cc.Node.EventType.TOUCH_CANCEL, function(t) {
                    cc.log("voice cancel");
                    var a = t.touch.getStartLocationInView()
                      , i = t.touch.getLocationInView();
                    cc.log("startLocationX=" + a.x + ",startLocationY=" + a.y),
                    cc.log("cancelLocationX=" + i.x + ",cancelLocationY=" + i.y),
                    e.hideRecordVoice();
                    var r = 50;
                    "mi " == navigator.userAgent.toLowerCase().match(/mi /i) && (cc.log("mi"),
                    r = 150),
                    i.x - a.x >= r || i.x - a.x <= 0 - r || i.y - a.y >= r || i.y - a.y <= 0 - r ? e._gameMode.cancelVoice() : e._gameMode.endVoice()
                }),
                e.btnVoice.active = !1,
                e._userPlayer = r.getChildByName("user_player"),
                e._userPlayer.active = !0,
                e.btnInvite = r.getChildByName("btn_invite"),
                e.btnInvite.on(cc.Node.EventType.TOUCH_END, function() {
                    this.setInviteShareMsg(!0, !0, !0)
                }
                .bind(this)),
                e.btnStart = r.getChildByName("btn_start"),
                e.btnStart.active = !1,
                e.btnStart.on(cc.Node.EventType.TOUCH_END, function() {
                    e._gameMode._GameFrame.userReady(),
                    e._gameMode.onResetData(),
                    e.btnCurrentResult.active = !1,
                    cc.log("send userRead")
                }),
                e.btnCurrentResult = r.getChildByName("btn_currentResult"),
                e.btnCurrentResult.on(cc.Node.EventType.TOUCH_END, function() {
                    e._gameMode.showResult()
                }),
                e.btnDismiss = r.getChildByName("btn_dismiss"),
                e.btnDismiss.on(cc.Node.EventType.TOUCH_END, function() {
                    e._gameMode.requestExitGame(),
                    cc.log("send Exit Game")
                }),
                e._playerNodeTemplate = e._userPlayer.getChildByName("pre_player_t"),
                e._playerNodeTemplate.active = !1,
                cc.log(" Gameview on load"),
                this.chatTextNode = [],
                this.faceNode = []
            },
            init: function() {
                cc.log("GameView init()"),
                this.myItem = this._gameMode.getMeItem(),
                this._CardLayer = this.node.getChildByName("node_Card").getComponent(u),
                this._CardLayer || (this._CardLayer = this.node.getChildByName("node_Card").addComponent(u)),
                this._CardLayer.setGameView(this),
                this._CardLayer.setCardFontAtlas(this._gameMode.getResFromResList(this._gameMode.geaCardFontResPath())),
                this._CardLayer.setCardBackAtlas(this._gameMode.getResFromResList(this._gameMode.geaCardBackResPath())),
                this._CardLayer.init(),
                this.resCache(),
                this.initRoomInfo(),
                this.initPlayerList(),
                this.changeBackGround(),
                this.loadAnimRes(),
                this.showNetDelay(this._gameMode._nNetDelay),
                this.setInviteShareMsg(!0, !1, !1),
                this.userItem = this._gameMode.getTableUsers();
                for (var e = 0; e < this.userItem.length; e++)
                    this.onUserJoinRoom(this.userItem[e]);
                this.refreshView(),
                this.initScreenFit(),
                this.ResetSetButton()
            },
            resCache: function() {
                this._gameMode.loadRes("client/res/game/common/ani/ani_magic", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/game/sparrow/prefabs/node_choose", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/game/sparrow/prefabs/node_hucard", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/game/sparrow/prefabs/node_menu", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/game/sparrow/prefabs/node_gameBtn", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/prefab/ui/game/resultLayer", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/prefab/ui/game/setLayer", cc.prefab, function() {}),
                this._gameMode.loadRes("client/res/prefab/ui/common/shareguide", cc.prefab, function() {}),
                this._gameMode.loadRes("sparrowpinghu/res/node_pufen", cc.prefab, function() {})
            },
            initScreenFit: function() {},
            initPlayerList: function() {
                if (0 == r.objectIsNull(this._playerList))
                    for (var e = 0; e < _.GAME_PLAYER; e++)
                        this.removePlayerNode(e);
                for (this._playerList = [],
                e = 0; e < _.GAME_PLAYER; ++e) {
                    var t = {
                        _data: {},
                        _node: null,
                        _view: {}
                    };
                    t._data._headCoverActive = !1,
                    t._data._strHeadUrl = "",
                    t._data._strName = "",
                    t._data._score = null,
                    t._data._ready = !1,
                    t._data._banker = !1,
                    t._data._offline = !1,
                    t._data._roomHost = !1,
                    t._data._listen = !1,
                    t._data._delaytime = !1,
                    t._data._freeReady = !1,
                    t._data._userPlayVoice = !1,
                    t._data._freeReady = !1,
                    t._data._pufen = 0,
                    this._playerList.push(t)
                }
                this.initPlayerNode()
            },
            initPlayerNode: function() {
                if (null != this._playerNodeTemplate && !(this._playerList.length < 1)) {
                    var e = function(e) {
                        this._gameMode.loadRes("sparrowpinghu/res/delaytime_bg", cc.SpriteFrame, function(t, a) {
                            if (t)
                                cc.log(t);
                            else {
                                if (null == e.getComponent(cc.Sprite)) {
                                    var i = e.addComponent(cc.Sprite);
                                    i.spriteFrame = a._res,
                                    i.sizeMode = cc.Sprite.SizeMode.CUSTOM
                                }
                                e.width = 230,
                                e.height = 65;
                                var r = new cc.Node;
                                r.addComponent(cc.Label).fontSize = 24,
                                r.name = "delaytimelabel",
                                r.parent = e,
                                r.y = -10
                            }
                        }
                        .bind(this))
                    }
                    .bind(this);
                    if (null == this._playerNodeTemplate.getChildByName("sp_pufen")) {
                        var t = new cc.Node("sp_pufen");
                        t.active = !1,
                        t.scale = .8,
                        t.addComponent(cc.Sprite),
                        this._playerNodeTemplate.addChild(t)
                    }
                    for (var a = 0; a < this._playerList.length; ++a) {
                        this._playerList[a]._node = 0 == a ? this._playerNodeTemplate : cc.instantiate(this._playerNodeTemplate),
                        a == _.MY_VIEWID ? this._playerList[a]._node.zIndex = -1 : this._playerList[a]._node.zIndex = 0;
                        var r = this._playerList[a]._node.addComponent("SparrowPlayerNode");
                        r.setHeadType(i.UserHeadType.GAME_TYPE);
                        var n = o.switchViewIDToDirection(_.GAME_PLAYER, a);
                        r.refreshHeadPos(n),
                        this._playerList[a]._NodeControl = r;
                        var s = this._playerList[a]._node;
                        s.parent = this._userPlayer;
                        var d = this._playerList[a]._view;
                        if (d.headCover = s.getChildByName("sp_headCover"),
                        d.sp_head = s.getChildByName("sp_head"),
                        d.txt_name = s.getChildByName("txt_name"),
                        d.txt_score = s.getChildByName("txt_score"),
                        d.txt_score.getComponent(cc.Label).string = "0",
                        d.sp_ready = s.getChildByName("sp_ready"),
                        d.sp_banker = s.getChildByName("sp_banker"),
                        d.sp_offline = s.getChildByName("sp_offline"),
                        d.sp_roomHost = s.getChildByName("sp_roomHost"),
                        d.sp_listen = s.getChildByName("sp_listen"),
                        d.sp_freeReady = s.getChildByName("sp_freeReady"),
                        d.btn_userinfo = s.getChildByName("btn_userinfo0"),
                        d.btn_userinfo.name = "btn_userinfo" + a,
                        d.btn_userinfo.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                        d.btn_userinfo.active = !0,
                        d.node_userPlayVoice = s.getChildByName("voice_play_ui"),
                        s.active = !1,
                        d.sp_delaytime = s.getChildByName("sp_delaytime"),
                        null == d.sp_delaytime) {
                            var c = new cc.Node;
                            c.active = !1,
                            c.name = "sp_delaytime",
                            s.addChild(c),
                            d.sp_delaytime = c
                        }
                        var h = o.switchViewIDToDirection(_.GAME_PLAYER, a);
                        h == _.DIRECTION_NORTH ? (d.sp_delaytime.x = -20,
                        d.sp_delaytime.y = -80) : h == _.DIRECTION_WEST ? (d.sp_delaytime.x = 70,
                        d.sp_delaytime.y = 80) : h == _.DIRECTION_SOUTH ? (d.sp_delaytime.x = 200,
                        d.sp_delaytime.y = -20) : h == _.DIRECTION_EAST && (d.sp_delaytime.x = 0,
                        d.sp_delaytime.y = 80),
                        e(d.sp_delaytime),
                        d.sp_pufen = s.getChildByName("sp_pufen"),
                        0 == a ? d.sp_pufen.setPosition(cc.v2(74, 24)) : d.sp_pufen.setPosition(cc.v2(0, 55))
                    }
                }
            },
            initTingFit: function() {
                var e = {};
                e.x = this.positionGame[i.UserDirection.DIRECTION_SOUTH].x + 120,
                e.y = this.positionGame[i.UserDirection.DIRECTION_SOUTH].y,
                null != this._tingInfo && null != this._tingInfo._node && (2 == _.GAME_PLAYER ? this._tingInfo._node.setPosition(-470, -140) : this._tingInfo._node.setPosition(e))
            },
            loadAnimRes: function() {
                var e = this;
                e._gameMode.loadRes("client/res/game/sparrow/prefabs/node_anim_q", cc.Prefab, function(t, a) {
                    t && cc.log(t),
                    e.node_anim = cc.instantiate(a._res),
                    e.node_anim.setName("node_anim"),
                    e.node_anim.parent = e.node,
                    e.node_anim.active = !1,
                    e.node_anim.getComponent(cc.Animation).on("finished", function() {
                        e.node_anim.active = !1
                    })
                }),
                e._gameMode.loadRes("client/res/game/sparrow/prefabs/ani_dianpao_q", cc.Prefab, function(t, a) {
                    t ? cc.log(t) : (e.node_dianpao = cc.instantiate(a._res),
                    e.node_dianpao.setName("ani_dianpao"),
                    e.node_dianpao.parent = e.node,
                    e.node_dianpao.active = !1,
                    e.node_dianpao.getComponent(cc.Animation).on("finished", function() {
                        e.node_dianpao.active = !1
                    }))
                }),
                e._gameMode.loadRes("client/res/game/sparrow/prefabs/ani_end", cc.Prefab, function(t, a) {
                    t && cc.log(t),
                    e.ani_end = cc.instantiate(a._res),
                    e.ani_end.setName("ani_end"),
                    e.ani_end.parent = e.node,
                    e.ani_end.active = !1,
                    e.ani_end.getComponent(cc.Animation).on("finished", function() {
                        e.ani_end.active = !1
                    })
                }),
                e._gameMode.loadRes("client/res/game/sparrow/prefabs/ain_hu1", cc.Prefab, function(t, a) {
                    t && cc.log(t);
                    var i = cc.instantiate(a._res);
                    i.setName("hushandian1"),
                    i.parent = e.node,
                    i.active = !1,
                    i.getComponent(cc.Animation).on("finished", function() {
                        i.active = !1
                    })
                }),
                e._gameMode.loadRes("client/res/game/sparrow/prefabs/ani_hu2", cc.Prefab, function(t, a) {
                    t && cc.log(t);
                    var i = cc.instantiate(a._res);
                    i.setName("hushandian2"),
                    i.parent = e.node,
                    i.active = !1,
                    i.getComponent(cc.Animation).on("finished", function() {
                        i.active = !1
                    })
                })
            },
            onNetDelay: function(e) {
                this.showNetDelay(e)
            },
            showNetDelay: function(e) {
                if (null != this.delay) {
                    var t = e;
                    this.delay.getComponent(cc.Label).string = e + "ms",
                    this.delay.color = t >= 500 ? cc.color(255, 0, 0, 255) : t < 500 && t >= 150 ? cc.color(255, 255, 0, 255) : cc.color(0, 255, 0, 255)
                }
            },
            update: function() {},
            onInitData: function() {},
            onResetData: function() {
                this.node && this.node.stopAllActions(),
                null != this._CardLayer && this._CardLayer.resetData(),
                this.hideCountDown()
            },
            updateBackgroundMusic: function() {},
            initRoomInfo: function() {
                s.prototype.start(),
                this._gameRuleString = s.prototype.getGameRulesStr(this._gameMode.getGameInfo()._llGameRule).join(" "),
                this._llGameRules = this._gameMode.getGameInfo()._llGameRule;
                var e = this._gameMode.getGameInfo();
                this.roomID.getComponent(cc.Label).string = e._strRoomID,
                this.roomInfo.getComponent(cc.Label).string = "\u623f\u53f7: " + e._strRoomID + " " + this._gameRuleString;
                var t = this._gameMode._nCurrentRound
                  , i = this._gameMode._nMaxRoundCount;
                if (this.roomRound.getComponent(cc.Label).string = t + "/" + i + "\u5c40",
                this.currentRound.getComponent(cc.Label).string = t + "/" + i,
                null == this._menuInfo) {
                    var r = this;
                    this.loadNodeLayer("_menuInfo", this._SetNodeInfo.ResPath, this._SetNodeInfo.zIndex, function() {
                        var e = cc.view.getVisibleSize();
                        this._menuInfo._node.x = e.width / 2,
                        this._menuInfo._node.y = 0;
                        var t = this._menuInfo._node.addComponent(cc.Widget);
                        t.isAlignTop = !0,
                        t.isAlignBottom = !0,
                        t.top = 0,
                        t.bottom = 0,
                        this._menuInfo._node.active = !1;
                        var i = this._menuInfo._node;
                        i.on(cc.Node.EventType.TOUCH_END, function() {
                            r.moveSetNode(!1)
                        }),
                        i.getChildByName("btn_set").on(cc.Node.EventType.TOUCH_END, function() {
                            r.moveSetNode(!1);
                            var e = {};
                            e._type = d,
                            e._para = {},
                            e._para.dwKindID = r._gameMode.getGameInfo()._dwKindID,
                            e._para.objDefaultValue = r._gameMode.getGameDefaultValue(),
                            window.YC.GC.postEvent(a.EventID.GE_UI_SHOW, e)
                        }),
                        i.getChildByName("btn_rule").on(cc.Node.EventType.TOUCH_END, function() {
                            var e = {};
                            e._type = C,
                            e._para = {},
                            e._para.objArray = s.prototype.ruleList,
                            e._para.nKindID = r._gameMode.getGameInfo()._dwKindID,
                            e._para.createRule = s,
                            e._para.nGameRule = r._gameMode.getGameInfo()._llGameRule,
                            e._para.bFromTeaHouse = 0 != r._gameMode.getGameInfo()._dwTeaHouseID,
                            window.YC.GC.postEvent(a.EventID.GE_UI_SHOW, e),
                            r.moveSetNode(!1)
                        }, this);
                        var n = i.getChildByName("btn_dismiss");
                        n.active = !0,
                        window.YC.GC.getPlayer();
                        var _ = r._gameMode.getGameInfo();
                        o._and(_._llGameRule, 4503599627370496) && (1 == _._cbGroupType ? n.active = !1 : 2 == _._cbGroupType && (n.active = !1)),
                        n.on(cc.Node.EventType.TOUCH_END, function() {
                            r._gameMode.requestExitGame()
                        })
                    }
                    .bind(this))
                }
            },
            onRefreshRoomInfo: function() {},
            onUpdateUser: function() {},
            setUserInitPosition: function() {
                for (var e = 0; e < _.GAME_PLAYER; e++) {
                    var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                      , a = o.switchViewIDToDirection(_.GAME_PLAYER, t);
                    2 == _.GAME_PLAYER ? this.setPlayerNodePos(t, this.positionFree_2Play[a]) : this.setPlayerNodePos(t, this.positionFree[a])
                }
            },
            setUserOnGamingPosition: function() {
                for (var e = 0; e < _.GAME_PLAYER; e++) {
                    var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                      , a = o.switchViewIDToDirection(_.GAME_PLAYER, t);
                    this.setPlayerNodePos(t, this.positionGame[a])
                }
            },
            setUserGpsPosition: function() {
                for (var e = 0; e < _.GAME_PLAYER; e++) {
                    var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                      , a = o.switchViewIDToDirection(_.GAME_PLAYER, t);
                    3 == _.GAME_PLAYER && a == _.DIRECTION_SOUTH ? this.setPlayerNodePos(t, this.positionGps[_.DIRECTION_NORTH]) : this.setPlayerNodePos(t, this.positionGps[a])
                }
            },
            onGameStartAction: function(e) {
                var t = this;
                t.roomInfo.active = !1;
                for (var a = 0; a < _.GAME_PLAYER; a++) {
                    var i = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), a)
                      , r = o.switchViewIDToDirection(_.GAME_PLAYER, i);
                    t._playerList[i]._node.runAction(cc.sequence(cc.moveTo(0, t.positionGame[r]), cc.callFunc(function(a, i) {
                        t.setPlayerReady(i, !1),
                        t.activeHeadCover(i, !0),
                        t.activePlayerName(i, !0),
                        t.activePlayerScore(i, !0),
                        i == _.MY_VIEWID && e()
                    }, this, i)))
                }
                this.curGameState = 1
            },
            playPlayerNodeAnim: function() {},
            sendCardAction: function(e, t, a, i, r) {
                this._CardLayer.startAction(e, t, a, i, r)
            },
            onUserReady: function(e) {
                var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                this.setPlayerReady(t, !0),
                e == this._gameMode.getMeChairId() && (this.btnStart.active = !1),
                this.refreshGpsNode()
            },
            onUserJoinRoom: function(e) {
                if (null != e) {
                    var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e._wChairID);
                    this.activePlayerNode(t, !0),
                    this.activePlayerName(t, !0),
                    this.setPlayerName(t, e._szNickName),
                    this.setPlayerOffline(t, !1),
                    this.setPlayerReady(t, !1),
                    this.setHeadUrl(t, e._szMobileHeadUrl),
                    0 == e._wChairID && 0 == this._gameMode.getMeChairId() && 0 == this._gameMode.getGameInfo()._dwGroupID && this._gameMode.loadRes("client/res/game/common/texture/b_jiesan", cc.SpriteFrame, function(e, t) {
                        null == e && (this.btnDismiss.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = t._res)
                    }
                    .bind(this)),
                    e._cbUserStatus == i.UserStatus.US_READY && this.setPlayerReady(t, !0),
                    e._cbUserStatus == i.UserStatus.US_OFFLINE && this.setPlayerOffline(t, !0),
                    this.refreshGpsNode(),
                    1 == this._bInviteShare && this.setInviteShareMsg(this._bInviteShare, !1, !1)
                }
            },
            updateUserOfflineTime: function(e, t) {
                if (null != this._gameMode.getTableUser(e)) {
                    var a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                    this.setOfflineTime(a, t)
                }
            },
            onUserLeave: function(e) {
                if (null != this._gameMode.getMeChairId()) {
                    var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                    this.activePlayerNode(t, !1),
                    this.refreshGpsNode(),
                    1 == this._bInviteShare && this.setInviteShareMsg(this._bInviteShare, !1, !1)
                }
            },
            onUserOffLine: function(e) {
                var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                this.setPlayerReady(t, !1),
                this.setPlayerOffline(t, !0),
                this.refreshGpsNode()
            },
            onGameStart: function(e, t, a) {
                var r = this
                  , n = this._gameMode._nCurrentRound
                  , s = this._gameMode._nMaxRoundCount;
                this.roomRound.getComponent(cc.Label).string = n + "/" + s + "\u5c40",
                this.currentRound.getComponent(cc.Label).string = n + "/" + s,
                this.centerNode.active = !0,
                this.btnStart.active = !1,
                this.btnCurrentResult.active = !1,
                this.btnInvite.active = !1,
                this.btnDismiss.active = !1,
                this.setInviteShareMsg(!1, !1, !1),
                o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (this.btnGPS.active = !0,
                2 == _.GAME_PLAYER && (this.btnGPS.active = !1)) : this.btnGPS.active = !1;
                var d = _.GAME_PLAYER;
                this._CardLayer.node.pauseSystemEvents(!0);
                var c = this._gameMode.getMeChairId();
                this.onGameStartAction(function() {
                    for (var i = 0; i < _.GAME_PLAYER; i++) {
                        var n = o.switchViewChairID(_.GAME_PLAYER, c, i);
                        o.switchViewIDToDirection(_.GAME_PLAYER, n),
                        i == r._gameMode._nBankerUser && r.setPlayerBanker(n),
                        r.sendCardAction(n, e[i], t[i], c, function() {
                            --d <= 0 && a()
                        })
                    }
                    r.leftCardCount.getComponent(cc.Label).string = r._gameMode._LeftCardCount
                }, this);
                var h = o.switchViewChairID(_.GAME_PLAYER, r._gameMode.getMeChairId(), r._gameMode._nFirstBankerUser);
                this.setPlayerRoomHost(h, !0),
                r.setTimeLayerDirection(h),
                r.setDirection(o.switchViewChairID(_.GAME_PLAYER, r._gameMode.getMeChairId(), r._gameMode._nBankerUser))
            },
            gameSendCard: function(e) {
                var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                  , a = this._gameMode.getCardData(e)
                  , i = this._gameMode.getCardCount(e);
                this._CardLayer.setHandCard(t, a, i),
                this.leftCardCount.getComponent(cc.Label).string = this._gameMode._LeftCardCount,
                this.setDirection(t);
                for (var n = 0; n < _.GAME_PLAYER; n++) {
                    var s = this._CardLayer._oDisCard[n].length - 1;
                    this._CardLayer._nPLActionState[n][s] == r.PLAC.ACTOIN_WAIT ? this._CardLayer.plCardMoveAct2(n, 0) : this._CardLayer._nPLActionState[n][s] == r.PLAC.ACTOIN_1 && this._CardLayer.plCardMoveAct2(n, 1),
                    this._CardLayer._nCardEnlargeActionState[n] == r.ENLARGE_AC.ACTOIN_SHOW && this._CardLayer.outCardEnlarge2()
                }
            },
            gameOutCard: function(e, t) {
                var a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                if (cc.log("__pl__ gameOutCard nViewId[" + a + "] nOutCard_[" + t + "]"),
                a != _.MY_VIEWID) {
                    var r = this._gameMode.getCardData(e)
                      , n = this._gameMode.getCardCount(e);
                    this._CardLayer.pushDisCard(a, t),
                    this._gameMode.getGameInfo()._dwKindID;
                    var s = this._gameMode.getGameSetValue(i.GameOptionString.OUT_CARD_TYPE);
                    switch (s) {
                    case i.GameOptionResult.FLY_DOWN:
                        this._CardLayer.handCardMoveToDisCard(a, r, n);
                        break;
                    case i.GameOptionResult.FALLING_DOWN:
                        this._CardLayer.outCardFalling(a, t, r, n);
                        break;
                    case i.GameOptionResult.ENLARGE_DOWN:
                        this._CardLayer.outCardEnlarge1(a, t, r, n);
                        break;
                    default:
                        cc.error("outCardType error [%s]", s)
                    }
                }
                this.leftCardCount.getComponent(cc.Label).string = this._gameMode._LeftCardCount
            },
            touchSendOutCard: function(e) {
                var t = this._gameMode.touchSendOutCard(e);
                return 1 == t && (this._CardLayer.pushDisCard(_.MY_VIEWID, e),
                this.hideGameButtons(),
                this.leftCardCount.getComponent(cc.Label).string = this._gameMode._LeftCardCount),
                t
            },
            autoSendOutCard: function(e) {
                return this._CardLayer.pushDisCard(_.MY_VIEWID, e),
                this.refreshHandCard(this._gameMode.getMeChairId()),
                this._CardLayer.autoSendOutCard(e)
            },
            OperateResult: function(e, t, a) {
                var i = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                  , n = this._gameMode.getCardData(e)
                  , s = this._gameMode.getCardCount(e);
                if (this.leftCardCount.getComponent(cc.Label).string = this._gameMode._LeftCardCount,
                t._cbParam != r.PARM.WIK_MING_GANG ? this._CardLayer.addWeaCard(i, t) : this._CardLayer.EditWeaCard(a, i, t._cbCardData, t._cbCardCount, t._cbPublicCard),
                this._CardLayer.setHandCard(i, n, s),
                this.setDirection(i),
                this.hideGameButtons(),
                this._CardLayer.cancelhandCardTingType(),
                e != t._wProvideUser && (t._wWeaveKind != r.WIK.WIK_GANG || t._cbParam != r.PARM.WIK_MING_GANG)) {
                    var d = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t._wProvideUser);
                    this._CardLayer.popDisCard(d)
                }
            },
            onGameConclude: function(e, t) {
                var a = this;
                this.hideGameButtons(),
                this.hideHuCardLayer();
                for (var i = 0; i < _.GAME_PLAYER; i++) {
                    var n = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), i);
                    this.setPlayerScore(n, this._gameMode._nGameScore[i]),
                    this.setPlayerPuFen(i, 0)
                }
                for (i = 0; i < _.GAME_PLAYER; i++)
                    this.setPlayerListen(i, !1);
                this._CardLayer.node.pauseSystemEvents(!0),
                this._CardLayer.hideCurrentCardFlag(),
                this._CardLayer.plCardMoveHide();
                var s = !1
                  , d = !1
                  , c = this._gameMode.getMeChairId()
                  , h = o.switchViewChairID(_.GAME_PLAYER, c, e._wProvideUser)
                  , C = new Array
                  , u = (new Array,
                e._bIsHuangZhuang)
                  , l = !0;
                for (1 == u && (l = !1),
                i = 0; i < _.GAME_PLAYER; i++)
                    if (C[i] = e._dwChiHuKind[i] == r.WIK.WIK_CHI_HU,
                    1 == C[i]) {
                        l = !1,
                        i == e._wProvideUser && (s = !0),
                        o._and(e._dwChiHuRight[i], r.CHR.CHR_QIANG_GANG_HU) && (d = !0);
                        var g = this._gameMode.getTableUser(i)._cbGender;
                        1 == s ? (this._gameMode.playActionSound(g, r.WIK.WIK_ZI_MO),
                        this.showOprateFlag(i, r.WIK.WIK_ZI_MO)) : (this._gameMode.playActionSound(g, r.WIK.WIK_CHI_HU),
                        this.showOprateFlag(i, r.WIK.WIK_CHI_HU))
                    }
                0 == s && 0 == l && 0 == u && this.showOprateFlag(e._wProvideUser, r.WIK.WIK_DIAN_PAO),
                1 == u && this.showRemindAnimation("ani_hz");
                var p = [0, .1, .5]
                  , m = 10;
                for (i = 0; i < _.GAME_PLAYER; i++)
                    if (e._dwChiHuRight[i] > 0) {
                        m = i;
                        break
                    }
                var I = !1;
                e._dwChiHuRight[m] & r.CHR.CHR_SHI_SAN_BU_KAO && (I = !0,
                p = [1, 1, 1]),
                this._CardLayer.cancelhandCardTingType(),
                this.node.runAction(cc.sequence(cc.delayTime(p[0]), cc.callFunc(function() {
                    var t = !0;
                    (s || u || l || d) && (t = !1),
                    this._CardLayer.deleteHuCard(h, t);
                    for (var i = 0; i < _.GAME_PLAYER; i++)
                        if (1 == C[i]) {
                            var r = o.switchViewChairID(_.GAME_PLAYER, c, i);
                            this._CardLayer.hideHandCard(r);
                            var n = !1;
                            a._gameMode._nBankerUser == i && (n = !0),
                            this._CardLayer.setGameEndHandCard(r, e._cbHandCardData[i], e._cbCardCount[i], e._cbProvideCard, !0, e._cbWeaveItemCount[i], u, l, c, n, I)
                        }
                }, this, this._gameMode))),
                this.node.runAction(cc.sequence(cc.delayTime(p[1]), cc.callFunc(function() {
                    for (var t = 0; t < _.GAME_PLAYER; t++)
                        if (1 != C[t]) {
                            var i = o.switchViewChairID(_.GAME_PLAYER, c, t);
                            this._CardLayer.hideHandCard(i);
                            var r = !1;
                            a._gameMode._nBankerUser == t && (r = !0),
                            this._CardLayer.setGameEndHandCard(i, e._cbHandCardData[t], e._cbCardCount[t], e._cbProvideCard, !1, e._cbWeaveItemCount[t], u, l, c, r, I)
                        }
                }, this, this._gameMode))),
                this.node.runAction(cc.sequence(cc.delayTime(p[2]), cc.callFunc(function() {
                    t()
                })))
            },
            GamePlayScene: function() {
                var e = this._gameMode.getCardData(nOperateUser_)
                  , t = this._gameMode.getCardCount(nOperateUser_);
                this._CardLayer.setHandCard(OperateViewId, e, t)
            },
            ifAutoReady: function() {
                return !!(o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY) || o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY_TIME_0S) || o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY_TIME_5S) || o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY_TIME_10S))
            },
            refreshView: function() {
                if (cc.log(this._gameMode._GameState),
                cc.log("---------\x3e>>refreshView()"),
                this.onResetData(),
                this.hideChooseGang(),
                this.hideChooseChi(),
                this._gameMode._GameState == this._gameMode.eGameState.GAME_FREE) {
                    if (cc.log("---------\x3e>>refreshView()  GAME_FREE"),
                    this.roomInfo.active = !0,
                    this._gameMode.getUserItem(this._gameMode.getMeChairId())._cbUserStatus != i.UserStatus.US_READY && (this.btnStart.active = !0),
                    this._gameMode._wCurrentRealRound > 0) {
                        this.setUserOnGamingPosition();
                        var e = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nBankerUser);
                        this.setPlayerBanker(e);
                        for (var t = 0; t < _.GAME_PLAYER; t++) {
                            var a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t);
                            this.activeHeadCover(a, !0),
                            this.setPlayerScore(a, this._gameMode._nGameScore[t])
                        }
                        this.btnInvite.active = !1,
                        this.btnDismiss.active = !1,
                        this.curGameState = 1,
                        this.setInviteShareMsg(!1, !1, !1)
                    } else {
                        for (this.setUserInitPosition(),
                        t = 0; t < _.GAME_PLAYER; t++)
                            a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                            this.activeHeadCover(a, !1),
                            this.setPlayerScore(a, this._gameMode._nGameScore[t]);
                        this.curGameState = 0
                    }
                    this.initRoomInfo(),
                    cc.log("this._gameMode._wCurrentRealRound = " + this._gameMode._wCurrentRealRound),
                    0 == this._gameMode._wCurrentRealRound && o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (this.showGpsNode(),
                    this.refreshGpsNode()) : this.hideGpsNode(),
                    o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (this.btnGPS.active = !0,
                    2 == _.GAME_PLAYER && (this.btnGPS.active = !1)) : this.btnGPS.active = !1
                } else if (this._gameMode._GameState == this._gameMode.eGameState.GAME_PUFEN) {
                    if (cc.log("---------\x3e>>refreshView()  GAME_PUFEN"),
                    this._gameMode._wCurrentRealRound > 0) {
                        for (this.setUserOnGamingPosition(),
                        e = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nBankerUser),
                        this.setPlayerBanker(e),
                        t = 0; t < _.GAME_PLAYER; t++)
                            a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                            this.activeHeadCover(a, !0),
                            this.setPlayerScore(a, this._gameMode._nGameScore[t]);
                        this.roomInfo.active = !1,
                        this.btnStart.active = !1,
                        this.btnInvite.active = !1,
                        this.btnDismiss.active = !1,
                        this.curGameState = 1,
                        this.setInviteShareMsg(!1, !1, !1)
                    } else {
                        for (this.setUserInitPosition(),
                        t = 0; t < _.GAME_PLAYER; t++)
                            a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                            this.activeHeadCover(a, !1),
                            this.setPlayerScore(a, this._gameMode._nGameScore[t]);
                        this.curGameState = 0
                    }
                    for (this.initRoomInfo(),
                    cc.log("this._gameMode._wCurrentRealRound = " + this._gameMode._wCurrentRealRound),
                    0 == this._gameMode._wCurrentRealRound && o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (this.showGpsNode(),
                    this.refreshGpsNode()) : this.hideGpsNode(),
                    this._gameMode._cbPuFenRecord[this._gameMode.getMeChairId()] > 0 ? this.showWaitJiaPu(!0) : -1 == this._gameMode._cbPuFenRecord[this._gameMode.getMeChairId()] ? this.showPuFenNode(this._gameMode._cbCanPuFen, this._gameMode._pufentimer) : this.hidePuFenNode(),
                    t = 0; t < _.GAME_PLAYER; t++)
                        a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                        this.setPlayerPuFen(a, this._gameMode._cbPuFenRecord[t])
                } else if (this._gameMode._GameState == this._gameMode.eGameState.GAME_PLAY) {
                    for (cc.log("---------\x3e>>refreshView()  GAME_PLAY"),
                    this.roomInfo.active = !1,
                    this.setUserOnGamingPosition(),
                    this.hideGameButtons(),
                    this.hideGpsNode(),
                    this.setInviteShareMsg(!1, !1, !1),
                    this.showWaitJiaPu(!1),
                    this.hidePuFenNode(),
                    t = 0; t < _.GAME_PLAYER; t++)
                        a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                        this.setPlayerPuFen(a, this._gameMode._lJiaPu[t]);
                    if (o._and(this._gameMode.getGameInfo()._llGameRule, r.GAME_RULE.GAME_RULE_BAO_TING))
                        for (t = 0; t < _.GAME_PLAYER; t++) {
                            var n = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t);
                            this.setPlayerListen(n, this._gameMode._bTing[t])
                        }
                    this.btnStart.active = !1,
                    this.btnInvite.active = !1,
                    this.btnCurrentResult.active = !1,
                    this.btnDismiss.active = !1,
                    this.centerNode.active = !0,
                    this.curGameState = 1,
                    this.leftCardCount.getComponent(cc.Label).string = this._gameMode._LeftCardCount,
                    this.setDirection(o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nCurrentUser)),
                    o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (this.btnGPS.active = !0,
                    2 == _.GAME_PLAYER && (this.btnGPS.active = !1)) : this.btnGPS.active = !1;
                    var s = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nBankerUser);
                    for (this.setPlayerBanker(s),
                    this.initRoomInfo(),
                    t = 0; t < _.GAME_PLAYER; t++) {
                        n = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t),
                        this.activeHeadCover(n, !0),
                        this.activePlayerScore(n, !0),
                        this.setPlayerScore(n, this._gameMode._nGameScore[t]);
                        for (var d = this._gameMode.getCardData(t), c = this._gameMode.getCardCount(t), h = this._gameMode.getDiscardCard(t), C = this._gameMode.getDiscardCount(t), u = this._gameMode.getWeaveCardData(t), l = this._gameMode.getWeaveCardCount(t), g = 0; g < C; g++)
                            this._CardLayer.pushDisCard(n, h[g]);
                        for (g = 0; g < l; g++)
                            this._CardLayer.addWeaCard(n, u[g]);
                        if (this._CardLayer.setHandCard(n, d, c),
                        this._gameMode._nActionMask > 0) {
                            if (this.showGameButtons(this._gameMode._nActionMask),
                            this._gameMode.getMeChairId() == this._gameMode._nCurrentUser)
                                var p = this._gameMode.getHandPromptCard(this._gameMode._nActionMask, 0);
                            else
                                p = this._gameMode.getHandPromptCard(this._gameMode._nActionMask, this._gameMode._nActionCard);
                            this.setPromptCardStyle(p)
                        }
                    }
                    if (this._gameMode.setTingNodeVisible(this._gameMode._bTingNodeVisible),
                    this.setAutoCardState(this._gameMode._bAutoCard),
                    0 == r.objectIsNull(this._gameMode._oTingData) && this._gameMode._nCurrentUser == this._gameMode.getMeChairId() && this.setHandCardTingType(this._gameMode._oTingData, !0),
                    this._gameMode._nOutCardUser != i.INVALID_CHAIR && 0 != this._gameMode._nOutCardData) {
                        var m = this._gameMode.getGameSetValue(i.GameOptionString.OUT_CARD_TYPE);
                        switch (m) {
                        case i.GameOptionResult.FLY_DOWN:
                            this._CardLayer.showCurrentCardFlag(o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nOutCardUser));
                            break;
                        case i.GameOptionResult.FALLING_DOWN:
                            d = this._gameMode.getCardData(this._gameMode._nOutCardUser),
                            c = this._gameMode.getCardCount(this._gameMode._nOutCardUser),
                            this._CardLayer.outCardFalling(o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nOutCardUser, this._gameMode._nOutCardData, d, c));
                            break;
                        case i.GameOptionResult.ENLARGE_DOWN:
                            d = this._gameMode.getCardData(this._gameMode._nOutCardUser),
                            c = this._gameMode.getCardCount(this._gameMode._nOutCardUser),
                            this._CardLayer.outCardEnlarge1(o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nOutCardUser), this._gameMode._nOutCardData, d, c);
                            break;
                        default:
                            cc.error("outCardType error [%s]", m)
                        }
                    }
                }
                if (o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_CHAT) && (this.btnChat.active = !0),
                o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_VOICE) && (this.btnVoice.active = window.YC.GF.supportAudioRecorder()),
                this._gameMode._nFirstBankerUser != i.INVALID_CHAIR) {
                    var I = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode._nFirstBankerUser);
                    this.setPlayerRoomHost(I, !0),
                    this.setTimeLayerDirection(I)
                }
                null != this._CardLayer && this._CardLayer.node.resumeSystemEvents(!0),
                this.ifAutoReady() && this._gameMode._GameState == _.GameStatus.GAME_SCENE_FREE && 0 == this._gameMode._wCurrentRealRound && 1 == this.btnStart.active && this.OnReady()
            },
            refreshHandCard: function(e) {
                var t = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e)
                  , a = this._gameMode.getCardData(e)
                  , i = this._gameMode.getCardCount(e);
                this._CardLayer.setHandCard(t, a, i)
            },
            hideGameButtons: function() {
                this.cancelPromptCardStyle(),
                null != this._gameBtnInfo && (null != this._gameBtnInfo._node ? (this._gameBtnInfo._show = !1,
                this._gameBtnInfo._node.active = !1,
                this._gameBtnInfo._HideAllChildren()) : this._gameBtnInfo._show = !1)
            },
            showGameButtons: function(e) {
                null != this._gameBtnInfo ? null != this._gameBtnInfo._node ? (this._gameBtnInfo._show = !0,
                this._gameBtnInfo._node.active = !0,
                this.recognizecbActionMask(e)) : this._gameBtnInfo._show = !0 : this.loadNodeLayer("_gameBtnInfo", this._GameButtonsNodeInfo.ResPath, this._GameButtonsNodeInfo.zIndex, function() {
                    this._gameBtnInfo._ChildrenNode = {},
                    this._gameBtnInfo._ChildrenNode.btnGuo = this._gameBtnInfo._node.getChildByName("btn_pass"),
                    this._gameBtnInfo._ChildrenNode.btnTing = this._gameBtnInfo._node.getChildByName("btn_listen"),
                    this._gameBtnInfo._ChildrenNode.btnHu = this._gameBtnInfo._node.getChildByName("btn_win"),
                    this._gameBtnInfo._ChildrenNode.btnGang = this._gameBtnInfo._node.getChildByName("btn_bridge"),
                    this._gameBtnInfo._ChildrenNode.btnPeng = this._gameBtnInfo._node.getChildByName("btn_bump"),
                    this._gameBtnInfo._ChildrenNode.btnChi = this._gameBtnInfo._node.getChildByName("btn_eat"),
                    this._gameBtnInfo._ChildrenNode.btnLiangxi = this._gameBtnInfo._node.getChildByName("btn_liangxi"),
                    this._gameBtnInfo._ChildrenNode.btnGuo.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnTing.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnHu.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnGang.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnPeng.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnChi.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._ChildrenNode.btnLiangxi.on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._gameBtnInfo._HideAllChildren = function() {
                        this._gameBtnInfo._ChildrenNode.btnGuo.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnTing.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnHu.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnGang.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnPeng.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnChi.active = !1,
                        this._gameBtnInfo._ChildrenNode.btnLiangxi.active = !1
                    }
                    .bind(this),
                    this.recognizecbActionMask(e)
                }
                .bind(this))
            },
            onButtonClickedEvent: function(e) {
                this._gameBtnInfo && e.target._parent._name == this._gameBtnInfo._node._name && "btn_eat" != e.target._name && "btn_bridge" != e.target._name && "btn_pass" != e.target._name && this.hideGameButtons(),
                this._gameMode.onButtonClickedEvent(e.target._name)
            },
            recognizecbActionMask: function(e) {
                if (e == r.WIK.WIK_NULL)
                    return !1;
                this._gameBtnInfo._HideAllChildren(),
                this._gameBtnInfo._ChildrenNode.btnGuo.active = !0;
                var t = this._gameBtnInfo._ChildrenNode.btnGuo.x
                  , a = this._gameBtnInfo._ChildrenNode.btnGuo.y
                  , i = 0;
                return e & (r.WIK.WIK_RIGHT | r.WIK.WIK_CENTER | r.WIK.WIK_LEFT) && (i++,
                this._gameBtnInfo._ChildrenNode.btnChi.active = !0,
                this._gameBtnInfo._ChildrenNode.btnChi.setPosition(cc.v2(t - 175 * i, a))),
                e & r.WIK.WIK_PENG && (i++,
                this._gameBtnInfo._ChildrenNode.btnPeng.active = !0,
                this._gameBtnInfo._ChildrenNode.btnPeng.setPosition(cc.v2(t - 175 * i, a))),
                e & r.WIK.WIK_GANG && (i++,
                this._gameBtnInfo._ChildrenNode.btnGang.active = !0,
                this._gameBtnInfo._ChildrenNode.btnGang.setPosition(cc.v2(t - 175 * i, a))),
                e & r.WIK.WIK_LISTEN && (i++,
                this._gameBtnInfo._ChildrenNode.btnTing.active = !0,
                this._gameBtnInfo._ChildrenNode.btnTing.setPosition(cc.v2(t - 175 * i, a))),
                e & r.WIK.WIK_LIANG_XI && (i++,
                this._gameBtnInfo._ChildrenNode.btnLiangxi.active = !0,
                this._gameBtnInfo._ChildrenNode.btnLiangxi.setPosition(cc.v2(t - 175 * i, a))),
                e & (r.WIK.WIK_ZI_MO | r.WIK.WIK_CHI_HU) && (i++,
                this._gameBtnInfo._ChildrenNode.btnHu.active = !0,
                this._gameBtnInfo._ChildrenNode.btnHu.setPosition(cc.v2(t - 175 * i, a))),
                !0
            },
            setListeningCard: function() {},
            reduceListenCardNum: function() {},
            showSameCard: function() {},
            playJiJiangFenZhang: function() {},
            showCardPlate: function() {},
            showOprateFlag: function(e, t) {
                var a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), e);
                if (0 == r.isValidViewId(a))
                    return !1;
                if (null == this.node_anim)
                    return !1;
                var i = o.switchViewIDToDirection(_.GAME_PLAYER, a);
                switch (t) {
                case r.WIK.WIK_NULL:
                    this.node_anim.active = !0,
                    this.node_anim.getComponent(cc.Animation).playAdditive("ani_guo_q"),
                    this.node_anim.setPosition(this.positionAnimation[i]);
                    break;
                case r.WIK.WIK_LEFT:
                case r.WIK.WIK_CENTER:
                case r.WIK.WIK_RIGHT:
                    this.node_anim.active = !0,
                    this.node_anim.getComponent(cc.Animation).playAdditive("ani_chi_q"),
                    this.node_anim.setPosition(this.positionAnimation[i]);
                    break;
                case r.WIK.WIK_PENG:
                    this.node_anim.active = !0,
                    this.node_anim.getComponent(cc.Animation).playAdditive("ani_peng_q"),
                    this.node_anim.setPosition(this.positionAnimation[i]);
                    break;
                case r.WIK.WIK_GANG:
                    this.node_anim.active = !0,
                    this.node_anim.getComponent(cc.Animation).playAdditive("ani_gang_q"),
                    this.node_anim.setPosition(this.positionAnimation[i]);
                    break;
                case r.WIK.WIK_CHI_HU:
                    this.node_anim.active = !0;
                    var n = cc.instantiate(this.node_anim);
                    n.setPosition(this.positionAnimation[i]),
                    n.getComponent(cc.Animation).playAdditive("ani_hu_q"),
                    this.node.addChild(n),
                    this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                        n.destroy()
                    })));
                    break;
                case r.WIK.WIK_DIAN_PAO:
                    this.node_dianpao.active = !0,
                    this.node_dianpao.getComponent(cc.Animation).play("ani_dianpao_q"),
                    this.node_dianpao.setPosition(this.positionAnimation[i]);
                    break;
                case r.WIK.WIK_ZI_MO:
                    this.node_anim.active = !0,
                    this.node_anim.getComponent(cc.Animation).playAdditive("ani_zimo_q"),
                    this.node_anim.setPosition(this.positionAnimation[i])
                }
            },
            showRemindAnimation: function(e) {
                this.ani_end.active = !0,
                this.ani_end.getComponent(cc.Animation).play(e)
            },
            onExitGame: function() {
                var e = this;
                null != this.node_anim && this.node_anim.getComponent(cc.Animation).off("finished", function() {
                    e.node_anim.active = !1
                }),
                null != this.ani_end && this.ani_end.getComponent(cc.Animation).off("finished", function() {
                    e.ani_end.active = !1
                })
            },
            moveSetNode: function(e) {
                this._menuInfo._node.active = e
            },
            setDirection: function(e) {
                for (var t = this.direction.children, a = 0; a < t.length; a++)
                    t[a].active = !1;
                var i = cc.repeatForever(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)));
                switch ((o.switchViewIDToDirection(_.GAME_PLAYER, e) + this._trimRotation) % 4) {
                case 0:
                    this.directionNorth.active = !0,
                    this.directionNorth.runAction(i);
                    break;
                case 1:
                    this.directionEast.active = !0,
                    this.directionEast.runAction(i);
                    break;
                case 2:
                    this.directionSouth.active = !0,
                    this.directionSouth.runAction(i);
                    break;
                case 3:
                    this.directionWest.active = !0,
                    this.directionWest.runAction(i)
                }
            },
            setTimeLayerDirection: function(e) {
                var t = 0;
                switch (e) {
                case 0:
                    t = 90,
                    this._trimRotation = 1;
                    break;
                case 1:
                    t = 0,
                    this._trimRotation = 0;
                    break;
                case 2:
                    t = 270,
                    this._trimRotation = 3;
                    break;
                case 3:
                    t = 180,
                    this._trimRotation = 2
                }
                this.direction.setRotation(t)
            },
            changeBackGround: function() {
                var e = this._gameMode.getBackgroundResPath()
                  , t = this._gameMode.getResFromResList(e)
                  , a = this.background.getComponent(cc.Sprite);
                null == t ? this._gameMode.loadRes(e, cc.SpriteFrame, function(e, t) {
                    null == e && (this.background.getComponent(cc.Sprite).spriteFrame = t._res)
                }
                .bind(this)) : a.spriteFrame = t
            },
            changeCardBack: function() {
                var e = this._gameMode.getResFromResList(this._gameMode.geaCardBackResPath())
                  , t = this._gameMode.getResFromResList(this._gameMode.geaCardFontResPath());
                if (null != e && null != t) {
                    this._CardLayer.setCardBackAtlas(e),
                    this._CardLayer.setCardFontAtlas(t);
                    var r = this._gameMode.getGameSetValue(i.GameOptionString.CARD_FONT_SIZE);
                    l.setCardFontSize(r),
                    this._CardLayer.changeCardBackRes()
                } else
                    window.YC.GC.postEvent(a.EventID.GE_UI_SHOW_NOTICE, "\u66f4\u65b0\u724c\u80cc\u5931\u8d25")
            },
            changeCardFontSize: function() {
                var e = this._gameMode.getResFromResList(this._gameMode.geaCardBackResPath())
                  , t = this._gameMode.getResFromResList(this._gameMode.geaCardFontResPath());
                if (null != e && null != t) {
                    this._CardLayer.setCardBackAtlas(e),
                    this._CardLayer.setCardFontAtlas(t);
                    var r = this._gameMode.getGameSetValue(i.GameOptionString.CARD_FONT_SIZE);
                    return l.setCardFontSize(r),
                    this._CardLayer.changeCardFontSize(this._gameMode.getGameSetValue(i.GameOptionString.CARD_FONT_SIZE)),
                    !0
                }
                return window.YC.GC.postEvent(a.EventID.GE_UI_SHOW_NOTICE, "\u66f4\u6362\u724c\u5b57\u5931\u8d25"),
                !1
            },
            showChooseChi: function(e, t) {
                e.length < 2 || (null != this._chiInfo ? null != this._chiInfo._node && (this._chiInfo._node.active = !0,
                this.chooseChi(e, t)) : this.loadNodeLayer("_chiInfo", this._ChooseNodeInfo.ResPath, this._ChooseNodeInfo.zIndex, function() {
                    this._chiInfo._show && this.chooseChi(e, t)
                }
                .bind(this)))
            },
            hideChooseChi: function() {
                null != this._chiInfo && (null != this._chiInfo._node ? (this._chiInfo._node.getChildByName("sp_bg").getChildByName("card_list").getChildByName("content").removeAllChildren(),
                this._chiInfo._node.active = !1,
                this._chiInfo._show = !1) : this._chiInfo._show = !1)
            },
            chooseChi: function(e, t) {
                if (!(e.length < 2)) {
                    for (var a = this, i = (o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode.getMeChairId()),
                    15 * (e.length - 1)), r = 0, n = 0; n < e.length; n++)
                        for (var s = 0; s < e[n].length; s++)
                            r += 50;
                    this._rootChoose = this._chiInfo._node,
                    this._rootChoose.getChildByName("sprite_splash").on(cc.Node.EventType.TOUCH_END, function() {
                        a._rootChoose.active = !1,
                        a._content.removeAllChildren()
                    }, this);
                    var d = this._rootChoose.getChildByName("sp_bg");
                    d.width = 100 + r + i + 30;
                    var c = d.getChildByName("sp_title_chi");
                    c.active = !0,
                    d.getChildByName("sp_title_gang").active = !1,
                    c.x = 0 - d.width + 55,
                    d.getChildByName("sp_line").x = 0 - d.width + 99;
                    var h = d.getChildByName("card_list");
                    for (h.x = 0 - d.width + 115,
                    h.width = d.width - 124,
                    this._content = h.getChildByName("content"),
                    n = 0; n < e.length; n++) {
                        var C = this._CardLayer._oCreateCard.createWeaCard(_.DIRECTION_SOUTH, e[n], e[n].length, !0);
                        this._content.addChild(C),
                        C.y = -45,
                        C.cardIndex = n,
                        C.setScale(50 / 68),
                        C.height = 120,
                        1 == e[n].length ? C.width = 50 : C.width = 150,
                        C.on(cc.Node.EventType.TOUCH_END, function(e) {
                            a._rootChoose.active = !1,
                            e.target.parent.removeAllChildren(),
                            t(e.target.cardIndex)
                        }, this)
                    }
                }
            },
            showChooseGang: function(e, t) {
                e.length < 2 || (null != this._gangInfo ? null != this._gangInfo._node && (this._gangInfo._node.active = !0,
                this.chooseGang(e, t)) : this.loadNodeLayer("_gangInfo", this._ChooseNodeInfo.ResPath, this._ChooseNodeInfo.zIndex, function() {
                    this._gangInfo._show && this.chooseGang(e, t)
                }
                .bind(this)))
            },
            hideChooseGang: function() {
                null != this._gangInfo && (null != this._gangInfo._node ? (this._gangInfo._node.getChildByName("sp_bg").getChildByName("card_list").getChildByName("content").removeAllChildren(),
                this._gangInfo._node.active = !1,
                this._gangInfo._show = !1) : this._gangInfo._show = !1)
            },
            chooseGang: function(e, t) {
                if (!(e.length < 2)) {
                    for (var a = this, i = (o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), this._gameMode.getMeChairId()),
                    15 * (e.length - 1)), r = 0, n = 0; n < e.length; n++)
                        for (var s = 0; s < e[n].length; s++)
                            3 != s && (r += 50);
                    this._rootChoose = this._gangInfo._node,
                    this._rootChoose.getChildByName("sprite_splash").on(cc.Node.EventType.TOUCH_END, function() {
                        a._rootChoose.active = !1,
                        a._content.removeAllChildren()
                    }, this);
                    var d = this._rootChoose.getChildByName("sp_bg");
                    d.width = 100 + r + i + 30;
                    var c = d.getChildByName("sp_title_gang");
                    c.active = !0,
                    d.getChildByName("sp_title_chi").active = !1,
                    c.x = 0 - d.width + 55,
                    d.getChildByName("sp_line").x = 0 - d.width + 99;
                    var h = d.getChildByName("card_list");
                    for (h.x = 0 - d.width + 115,
                    h.width = d.width - 124,
                    this._content = h.getChildByName("content"),
                    n = 0; n < e.length; n++) {
                        var C = this._CardLayer._oCreateCard.createWeaCard(_.DIRECTION_SOUTH, e[n], e[n].length, !0);
                        this._content.addChild(C),
                        C.y = -45,
                        C.cardIndex = n,
                        C.setScale(50 / 68),
                        C.height = 120,
                        1 == e[n].length ? C.width = 50 : C.width = 150,
                        C.on(cc.Node.EventType.TOUCH_END, function(e) {
                            a._rootChoose.active = !1,
                            e.target.parent.removeAllChildren(),
                            t(e.target.cardIndex)
                        }, this)
                    }
                }
            },
            setHandCardTingType: function(e, t) {
                return this._CardLayer.setHandCardTingType(e, t)
            },
            setTingNodeVisible: function(e) {
                e ? null == this._tingInfo ? this.loadNodeLayer("_tingInfo", this._TingNodeInfo.ResPath, this._TingNodeInfo.zIndex, function() {
                    this._tingInfo._node.getChildByName("btn_show_card").on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._tingInfo._node.getChildByName("btn_auto_card_off").on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this._tingInfo._node.getChildByName("btn_auto_card_on").on(cc.Node.EventType.TOUCH_END, this.onButtonClickedEvent, this),
                    this.initTingFit(),
                    this.setAutoCardState(this._gameMode._bAutoCard)
                }
                .bind(this)) : null != this._tingInfo._node ? this._tingInfo._node.active = e : this._tingInfo._show = e : null != this._tingInfo && (this._tingInfo._show = e,
                null != this._tingInfo._node && (this._tingInfo._node.active = e)),
                this.setAutoCardState(this._gameMode._bAutoCard),
                0 == e && this.hideHuCardLayer()
            },
            setAutoCardState: function(e) {
                null != this._tingInfo && null != this._tingInfo._node && (this._tingInfo._node.getChildByName("btn_auto_card_off").active = !1,
                this._tingInfo._node.getChildByName("btn_auto_card_on").active = !1,
                o._and(this._gameMode.getGameInfo()._llGameRule, r.GAME_RULE.GAME_RULE_BAO_TING) ? (this._tingInfo._node.getChildByName("btn_auto_card_off").active = !1,
                this._tingInfo._node.getChildByName("btn_auto_card_on").active = !1) : 1 == e ? this._tingInfo._node.getChildByName("btn_auto_card_on").active = !0 : this._tingInfo._node.getChildByName("btn_auto_card_off").active = !0)
            },
            enbaleHuCardLayer: function() {
                return null != this._huCardInfo && (null == this._huCardInfo._node ? this._huCardInfo._show : this._huCardInfo._node.active)
            },
            showHuCardLayer: function(e) {
                var t = function() {
                    var t = this._huCardInfo._node
                      , a = t.getChildByName("Background");
                    a.width = 98 + 230 * e._cbHuCardCount,
                    1 == e._cbHuCardCount ? t.x = -150 : 2 == e._cbHuCardCount ? t.x = -300 : 3 == e._cbHuCardCount ? t.x = -450 : e._cbHuCardCount <= 4 ? t.x = -550 : (t.x = -550,
                    a.width = a.width + 920),
                    a.getChildByName("scrollview").width = a.width - 20 - 98;
                    for (var o = 0; o < e._cbHuCardCount; o++) {
                        var n = cc.instantiate(t.getChildByName("cloneNode"));
                        n.active = !0;
                        var s = this._CardLayer._oCreateCard.createHandCardSpr(i.UserDirection.DIRECTION_SOUTH, e._cbHuCardData[o]);
                        s.setScale(.9),
                        s.y = -60,
                        n.getChildByName("CardNode").addChild(s),
                        n.getChildByName("strHuType").getComponent(cc.Label).string = r.getChiHuType(e._dwChiHuRight[o]),
                        n.getChildByName("strSurplusCount").getComponent(cc.Label).string = e._cbHuCardRemainingCount[o] + "\u5f20",
                        a.getChildByName("scrollview").getChildByName("content").addChild(n)
                    }
                    t.active = !0,
                    t.setScale(0),
                    t.runAction(cc.scaleTo(.2, 1))
                }
                .bind(this);
                null == this._huCardInfo ? this.loadNodeLayer("_huCardInfo", this._HuCardNodeInfo.ResPath, this._HuCardNodeInfo.zIndex, function() {
                    this._huCardInfo._show && t()
                }
                .bind(this)) : null != this._huCardInfo._node ? t() : this._huCardInfo._show = !0
            },
            hideHuCardLayer: function(e) {
                if (null != this._huCardInfo)
                    if (null != this._huCardInfo._node) {
                        var t = this._huCardInfo._node;
                        e ? (t.getChildByName("Background").getChildByName("scrollview").getChildByName("content").removeAllChildren(),
                        t.stopAllActions(),
                        t.active = !1) : (t.setScale(1),
                        t.runAction(cc.sequence(cc.scaleTo(.2, 0), cc.callFunc(function() {
                            t.getChildByName("Background").getChildByName("scrollview").getChildByName("content").removeAllChildren(),
                            t.active = !1,
                            t.setScale(1)
                        }
                        .bind(this)))))
                    } else
                        this._huCardInfo._show = !1
            },
            showChatText: function(e) {
                this.curChatUserId = e._dwCurUserID,
                this.removeChatNode();
                var t = this.getChairIdByUserId(this.curChatUserId)
                  , a = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), t)
                  , r = o.switchViewIDToDirection(_.GAME_PLAYER, a)
                  , n = new cc.Node("chatText");
                r == i.UserDirection.DIRECTION_WEST || r == i.UserDirection.DIRECTION_SOUTH ? (n._anchorPoint = cc.v2(0, .5),
                n.setPosition(cc.v2(25, 65))) : r == i.UserDirection.DIRECTION_NORTH ? (n.angle = -180,
                n._anchorPoint = cc.v2(0, .5),
                n.setPosition(cc.v2(25, -65))) : r == i.UserDirection.DIRECTION_EAST && (n.scaleX = -1,
                n._anchorPoint = cc.v2(0, .5),
                n.setPosition(cc.v2(-15, 65))),
                this._gameMode.loadRes("client/res/tex/game/chat/p_yuyintiao", cc.SpriteFrame, function(t, o) {
                    if (!t) {
                        var s = n.addComponent(cc.Sprite);
                        s.spriteFrame = o._res,
                        s.type = cc.Sprite.Type.SLICED,
                        s.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                        s.markForUpdateRenderData(!0),
                        s.spriteFrame._calculateSlicedUV();
                        var _ = new cc.Node("chatText");
                        _._anchorPoint = cc.v2(0, .5),
                        _.setPosition(10, -5),
                        _.color = new cc.color(147,86,13),
                        _.width = 21 * e._curString.length,
                        n.width = _.width,
                        n.addChild(_);
                        var d = _.addComponent(cc.Label);
                        d._anchorPoint = cc.v2(0, .5),
                        d.fontSize = 20,
                        d.string = e._curString,
                        r == i.UserDirection.DIRECTION_NORTH ? (_.angle = -180,
                        _._anchorPoint = cc.v2(1, .5),
                        _.setPosition(5, 15)) : r == i.UserDirection.DIRECTION_EAST && (_._anchorPoint = cc.v2(1, .5),
                        _.setPosition(5, -5),
                        _.scaleX = -1),
                        this.chatTextNode[this.curChatUserId] = n;
                        var c = this.getHeadSpriteNode(a);
                        null != c && (n.zIndex = 10,
                        c.addChild(n)),
                        this.chatTextNode[this.curChatUserId].runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function(e, t) {
                            t && this.chatTextNode[t] && (this.chatTextNode[t].destroy(),
                            this.chatTextNode[t] = null)
                        }, this, this.curChatUserId)))
                    }
                }
                .bind(this))
            },
            removeChatNode: function() {
                cc.log(this.chatTextNode[this.curChatUserId]),
                this.curChatUserId && this.chatTextNode[this.curChatUserId] && (this.chatTextNode[this.curChatUserId].stopAllActions(),
                this.chatTextNode[this.curChatUserId].destroy(),
                this.chatTextNode[this.curChatUserId] = null),
                this.curFaceUserId && this.faceNode[this.curFaceUserId] && (this.faceNode[this.curFaceUserId].stopAllActions(),
                this.faceNode[this.curFaceUserId].destroy(),
                this.faceNode[this.curFaceUserId] = null)
            },
            showFace: function(e) {
                this.curFaceUserId = e._dwTargetUserID;
                var t = this
                  , a = ["exp0", "exp1", "exp2", "exp3", "exp4", "exp5", "exp6", "exp8", "exp9", "exp10", "exp11", "exp12", "exp13", "exp14", "exp15", "exp16", "exp17", "exp18"]
                  , i = this.getChairIdByUserId(this.curFaceUserId)
                  , r = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), i)
                  , n = cc.v2(0, 0);
                0 == this.curGameState ? (n.x = t.getPlayerNodePos(r).x + [0, 0, 0, 0][r],
                n.y = t.getPlayerNodePos(r).y + [100, 100, 100, 100][r]) : (n.x = t.getPlayerNodePos(r).x + [0, 100, 0, -100][r],
                n.y = t.getPlayerNodePos(r).y + [-100, -0, 100, 0][r]),
                t._gameMode.loadRes("client/res/game/sparrow/prefabs/Face_ani", cc.prefab, function(i, r) {
                    null != i && cc.log("Load Res Failed resPath: Face_ani");
                    var o = cc.instantiate(r._res);
                    o.setPosition(n),
                    t.node.addChild(o),
                    o.getComponent(cc.Animation).play(a[e._wItemIndex]),
                    o.getComponent(cc.Animation).getAnimationState(a[e._wItemIndex]).on("stop", function() {
                        o.destroy()
                    }, t)
                })
            },
            showVoice: function(e) {
                var t = this.getChairIdByUserId(e._dwSendUserID);
                this._gameMode.playVoice(e._curString, t)
            },
            showMagicFace: function(e) {
                cc.log("\u9b54\u6cd5\u8868\u60c5\u6d88\u606f");
                var t = this
                  , i = this._gameMode.getUserItem(this._gameMode.getMeChairId())._dwUserID
                  , r = this._gameMode.switchUserIdToChairId(e._dwSendUserID)
                  , n = this._gameMode.switchUserIdToChairId(e._dwTargetUserID)
                  , s = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), r)
                  , d = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), n)
                  , c = (o.switchViewIDToDirection(_.GAME_PLAYER, d),
                ["ani_tomato", "ani_chiken", "ani_rose_new", "ani_water", "ani_boom"]);
                if (e._dwSendUserID == e._dwTargetUserID)
                    return i == e._dwSendUserID && window.YC.GC.postEvent(a.EventID.GE_UI_SHOW_NOTICE, "\u4e0d\u80fd\u5bf9\u81ea\u5df1\u53d1\u9001\u9b54\u6cd5\u8868\u60c5"),
                    !0;
                if (e._dwSendUserID == i) {
                    var C = {};
                    C._type = h,
                    window.YC.GC.postEvent(a.EventID.GE_UI_HIDE, C)
                }
                this._gameMode.loadRes("client/res/game/common/texture/magic_face/MagicAtlas", cc.SpriteAtlas, function(a, i) {
                    null != a && cc.log("Load Res Failed resPath: MagicAtlas");
                    var r = new cc.Node;
                    t.node.addChild(r),
                    r.addComponent(cc.Sprite).spriteFrame = i._res.getSpriteFrame("ico_index_" + e._wItemIndex);
                    var o = t.getPlayerNodePos(s)
                      , n = t.getPlayerNodePos(d)
                      , _ = Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2)) / 1e3;
                    r.setPosition(o);
                    var h = cc.moveTo(_, n)
                      , C = cc.rotateBy(_, 3600 / _)
                      , u = cc.spawn(h, C);
                    r.runAction(cc.sequence(u, cc.callFunc(function() {
                        r.destroy(),
                        t._gameMode.playEffect("client/res/game/common/sound/magic_face/sound_index_" + e._wItemIndex),
                        t._gameMode.loadRes("client/res/game/common/ani/ani_magic", cc.prefab, function(a, i) {
                            null != a && cc.log("Load Res Failed resPath: ani_magic");
                            var r = cc.instantiate(i._res)
                              , o = t.getPlayerNodePos(d);
                            r.setPosition(o),
                            t.node.addChild(r),
                            r.getComponent(cc.Animation).play(c[e._wItemIndex]),
                            r.getComponent(cc.Animation).getAnimationState(c[e._wItemIndex]).on("stop", function() {
                                r.destroy()
                            }, t)
                        })
                    })))
                })
            },
            showHouseDissolveRoom: function() {
                cc.log("\u6b64\u623f\u95f4\u5df2\u88ab\u9986\u4e3b\u89e3\u6563"),
                window.YC.GC.postEvent(a.EventID.GE_UI_SHOW_NOTICE, "\u6b64\u623f\u95f4\u5df2\u88ab\u9986\u4e3b\u89e3\u6563")
            },
            setVoiceFlag: function(e) {
                this.btnVoice.active = e,
                e && (this.btnVoice.active = window.YC.GF.supportAudioRecorder())
            },
            showRecordVoice: function() {
                null != this._luYinInfo ? null != this._luYinInfo._node ? (this._luYinInfo._show = !0,
                this._luYinInfo._node.active = !0) : this._luYinInfo._show = !0 : this.loadNodeLayer("_luYinInfo", this._LuYinNodeInfo.ResPath, this._LuYinNodeInfo.zIndex, function() {}
                .bind(this))
            },
            hideRecordVoice: function() {
                null != this._luYinInfo && (null != this._luYinInfo._node ? (this._luYinInfo._show = !1,
                this._luYinInfo._node.active = !1) : this._luYinInfo._show = !1)
            },
            getChairIdByUserId: function(e) {
                for (var t = this._gameMode.getTableUsers(), a = 0; a < t.length; a++)
                    if (e == t[a]._dwUserID)
                        return t[a]._wChairID
            },
            onClickGpsBtn: function() {
                null != this._gpsInfo && this._gpsInfo._show ? (this.hideGpsNode(),
                this.setUserOnGamingPosition()) : (this.showGpsNode(),
                this.refreshGpsNode())
            },
            showGpsNode: function() {
                if (2 != _.GAME_PLAYER) {
                    for (var e = 0; e < _.GAME_PLAYER; e++)
                        this.setPlayType(e, i.UserHeadType.GPS_TYPE);
                    this.setUserGpsPosition(),
                    null != this._gpsInfo ? (this._gpsInfo._show = !0,
                    null != this._gpsInfo._node && (this._gpsInfo._node.active = !0)) : this.loadNodeLayer("_gpsInfo", this._GPSNodeInfo.ResPath, this._GPSNodeInfo.zIndex, function() {
                        this._gpsInfo._show && this.refreshGpsNode()
                    }
                    .bind(this))
                }
            },
            refreshGpsNode: function() {
                if (null != this._gpsInfo && null != this._gpsInfo._node && 0 != this._gpsInfo._node.active) {
                    var e = this._gameMode.getTableUsers()
                      , t = this._gpsInfo._node.getChildByName("node_ChairCount4");
                    3 == _.GAME_PLAYER && (t = this._gpsInfo._node.getChildByName("node_ChairCount3")),
                    t.active = !0;
                    for (var a = 0; a < 4; a++)
                        for (var i = 0; i < 4; i++)
                            (r = t.getChildByName("la_distance_" + a + "_to_" + i)) && (r.active = !1);
                    for (a = 0; a < _.GAME_PLAYER; a++)
                        for (i = 0; i < _.GAME_PLAYER; i++)
                            if (e[a] && e[i] && a != i) {
                                var r, n = e[a]._wChairID, s = e[i]._wChairID, d = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), n), c = o.switchViewChairID(_.GAME_PLAYER, this._gameMode.getMeChairId(), s), h = o.switchViewIDToDirection(_.GAME_PLAYER, d), C = o.switchViewIDToDirection(_.GAME_PLAYER, c);
                                if (!(r = t.getChildByName("la_distance_" + h + "_to_" + C)))
                                    continue;
                                if (r.active = !0,
                                r.color = new cc.color(255,255,255),
                                1 == e[a]._bCoordinateSwitch && 1 == e[i]._bCoordinateSwitch) {
                                    var u = o.funGetDistances(e[a]._dLatitude, e[a]._dLongitude, e[i]._dLatitude, e[i]._dLongitude);
                                    u >= 1 ? r.getComponent(cc.Label).string = Math.floor(u) + "\u516c\u91cc" : (u *= 1e3,
                                    r.getComponent(cc.Label).string = Math.floor(u) + "\u7c73",
                                    u < 100 && (r.color = new cc.color(255,0,0)))
                                } else
                                    r.getComponent(cc.Label).string = "\u672a\u5f00\u542f\u5b9a\u4f4d",
                                    r.color = new cc.color(255,0,0)
                            }
                }
            },
            hideGpsNode: function() {
                for (var e = 0; e < _.GAME_PLAYER; e++)
                    this.setPlayType(e, i.UserHeadType.GAME_TYPE);
                this._userPlayer.active = !0,
                null != this._gpsInfo && (null != this._gpsInfo._node ? (this._gpsInfo._show = !1,
                this._gpsInfo._node.active = !1) : this._gpsInfo._show = !1)
            },
            loadNodeLayer: function(e, t, a, i) {
                this[e] = {},
                this[e]._show = !0,
                this[e]._node = null,
                this._gameMode.loadRes(t, cc.prefab, function(t, r) {
                    null == t && (this[e]._node = cc.instantiate(r._res),
                    this[e]._node.parent = this.node,
                    this[e]._node.active = this[e]._show,
                    null != a && (this[e]._node.zIndex = a),
                    i())
                }
                .bind(this))
            },
            showSpecialCard: function() {
                null != this._specialCardInfo ? null != this._specialCardInfo._node ? (this._specialCardInfo._show = !0,
                this._specialCardInfo._node.active = !0) : this._specialCardInfo._show = !0 : this.loadNodeLayer("_specialCardInfo", this._SpecialCardNodeInfo.ResPath, this._SpecialCardNodeInfo.zIndex, function() {}
                .bind(this))
            },
            hideSpecialCard: function() {
                null != this._specialCardInfo && (null != this._specialCardInfo._node ? (this._specialCardInfo._show = !1,
                this._specialCardInfo._node.active = !1) : this._specialCardInfo._show = !1)
            },
            showMenu: function() {
                null != this._menuInfo._node && this.moveSetNode(this.bBtnBgOut)
            },
            checkArrayPara: function(e, t) {
                return !(null == t || (null == e || e < 0 || e >= t.length) && (cc.error("checkHeadPara error param nIndex_:" + e),
                1))
            },
            activePlayerNode: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._activeNode = t,
                null != this._playerList[e]._node && (this._playerList[e]._node.active = t))
            },
            removePlayerNode: function(e) {
                this.checkArrayPara(e, this._playerList) && null != this._playerList[e]._node && (0 == e ? this._playerList[e]._node.active = !1 : this._playerList[e]._node.removeFromParent(),
                this._playerList[e]._node = null)
            },
            setPlayerNodePos: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._nodePos = t,
                null != this._playerList[e]._node && this._playerList[e]._node.setPosition(t))
            },
            activeHeadCover: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._headCoverActive = t,
                null != this._playerList[e]._view.headCover && (this._playerList[e]._view.headCover.active = t))
            },
            setHeadUrl: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._strHeadUrl = t,
                null != this._playerList[e]._view.sp_head && (this._playerList[e]._view.sp_head.getComponent("HeadSprite").HeadURL = "",
                this._playerList[e]._view.sp_head.getComponent("HeadSprite").LoadHead(),
                cc.log("__\u8bbe\u7f6e\u5934\u50cf_index:[%d] headUrl=[%s]", e, t),
                this._playerList[e]._view.sp_head.getComponent("HeadSprite").HeadURL = t,
                this._playerList[e]._view.sp_head.getComponent("HeadSprite").LoadHead()))
            },
            getHeadSpriteNode: function(e) {
                return this.checkArrayPara(e, this._playerList) ? null == this._playerList[e]._view.sp_head ? null : this._playerList[e]._view.sp_head : null
            },
            setPlayType: function(e, t) {
                this.checkArrayPara(e, this._playerList) && null != this._playerList[e]._NodeControl && this._playerList[e]._NodeControl.setHeadType(t)
            },
            setPlayerName: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._strName = t,
                null != this._playerList[e]._view.txt_name && (this._playerList[e]._view.txt_name.getComponent(cc.Label).string = t))
            },
            activePlayerName: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._nameActive = t,
                null != this._playerList[e]._view.txt_name && (this._playerList[e]._view.txt_name.active = t))
            },
            setPlayerScore: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._score = t,
                null != this._playerList[e]._view.txt_score && (this._playerList[e]._view.txt_score.getComponent(cc.Label).string = t))
            },
            activePlayerScore: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._activeScore = t,
                null != this._playerList[e]._view.txt_score && (this._playerList[e]._view.txt_score.active = t))
            },
            setPlayerReady: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._ready = t,
                null != this._playerList[e]._view.sp_ready && (this._playerList[e]._view.sp_ready.active = t))
            },
            setPlayerBanker: function(e) {
                if (this.checkArrayPara(e, this._playerList) && null != this._playerList[e]._view.sp_banker) {
                    for (var t = 0; t < _.GAME_PLAYER; t++)
                        this._playerList[t]._view.sp_banker.active = !1,
                        this._playerList[t]._data._banker = !1;
                    this._playerList[e]._data._banker = !0,
                    this._playerList[e]._view.sp_banker.active = !0
                }
            },
            setPlayerOffline: function(e, t) {
                if (this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._offline = t,
                null != this._playerList[e]._view.sp_offline && (this._playerList[e]._view.sp_offline.active = t,
                t && this._gameMode._wCurrentRealRound <= 0))) {
                    this._gameMode._time = [];
                    for (var a = 0; a < _.GAME_PLAYER; a++)
                        null != this._gameMode._time[a] && 0 != this._gameMode._time[a] || (this._gameMode._time[a] = 1);
                    this.offlineText(e, t)
                }
            },
            offlineText: function(e, t) {
                var a = this
                  , i = this._playerList[e]._view.sp_offline;
                if (1 == i.active) {
                    var r = o.secondToMinuteSecond(a._gameMode._time[e]);
                    i.getChildByName("time").getComponent(cc.Label).string = r
                } else
                    a._gameMode._time[e] = 0,
                    i.getChildByName("time").getComponent(cc.Label).string = "";
                0 != a._gameMode._time[e] ? setTimeout(function() {
                    a._gameMode._time[e]++,
                    a.offlineText(e, t)
                }, 1e3) : (a._gameMode._time[e] = 0,
                i.getChildByName("time").getComponent(cc.Label).string = "")
            },
            setOfflineTime: function(e, t) {
                if (this.checkArrayPara(e, this._playerList) && (t > 3599 && (t = 3599),
                this._playerList[e]._data._offlineTime = t,
                null != this._playerList[e]._view.sp_offline)) {
                    var a = o.secondToMinuteSecond(t);
                    this._playerList[e]._view.sp_offline.getChildByName("time").getComponent(cc.Label).string = a
                }
            },
            setPlayerRoomHost: function(e, t) {
                if (this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._roomHost = t,
                null != this._playerList[e]._view.sp_roomHost)) {
                    for (var a = 0; a < _.GAME_PLAYER; a++)
                        this._playerList[a]._view.sp_roomHost.active = !1;
                    this._playerList[e]._view.sp_roomHost.active = t
                }
            },
            setPlayerListen: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._listen = t,
                null != this._playerList[e]._view.sp_listen && (this._playerList[e]._view.sp_listen.active = t))
            },
            setDelayTime: function(e, t, a, i) {
                if (this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._delaytime = t,
                null != this._playerList[e]._view.sp_delaytime && (this._playerList[e]._view.sp_delaytime.active = t,
                0 != t))) {
                    var r = Math.floor(i / 60)
                      , o = i % 60;
                    this._playerList[e]._view.sp_delaytime.getChildByName("delaytimelabel").getComponent(cc.Label).string = "\u7d2f\u8ba1\u62d6\u5ef6:" + (r > 0 ? r + "\u5206" : "") + o + "\u79d2"
                }
            },
            setPlayerTalk: function(e, t) {
                this.checkArrayPara(e, this._playerList) && (this._playerList[e]._data._userPlayVoice = t,
                null != this._playerList[e]._view.node_userPlayVoice && (this._playerList[e]._view.node_userPlayVoice.active = t))
            },
            getPlayerNodePos: function(e) {
                if (!this.checkArrayPara(e, this._playerList))
                    return new cc.v2(0);
                var t = o.switchViewIDToDirection(_.GAME_PLAYER, e);
                return 0 == this._gameMode._wCurrentRealRound ? o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_GPS) ? (t == _.DIRECTION_SOUTH && 3 == _.GAME_PLAYER && (t = _.DIRECTION_NORTH),
                2 == _.GAME_PLAYER ? this.positionFree_2Play[t] : this.positionGps[t]) : 2 == _.GAME_PLAYER ? this.positionFree_2Play[t] : this.positionFree[t] : this.positionGame[t]
            },
            setInviteShareMsg: function(t, i, r) {
                if (this._bInviteShare = t,
                cc.log("setInviteShareMsg bInvite_:" + t + "  bShowGuide_:" + i + " bShowSelectShareLayer_:" + r),
                0 != t) {
                    for (var n = this._gameMode.getGameInfo(), s = "", d = 0; d < window.YC.Web.gamelist.length; d++)
                        if (window.YC.Web.gamelist[d].KindID == String(n._dwKindID)) {
                            s = window.YC.Web.gamelist[d].KindName;
                            break
                        }
                    for (var c = _.GAME_PLAYER, h = 0, C = 0, u = this._gameMode.getTableUsers(), l = 0; l < u.length; l++) {
                        var g = u[l];
                        null != g && (h++,
                        g._wChairID == this._gameMode.getMeChairId() && (C = g._dwTeamID))
                    }
                    var p = o.switchSmallToBigNumber(h) + "\u7f3a" + o.switchSmallToBigNumber(c - h);
                    c - h == 0 && (p = "");
                    var m = e("UISelectShare")
                      , I = {};
                    I._type = m,
                    I._para = {},
                    I._para._shareType = "gameInvite",
                    I._para._cbGroupType = n._cbGroupType,
                    I._para._dwTeamID = C,
                    I._para._dwRoomID = n._strRoomID,
                    I._para._dwKindID = n._dwKindID,
                    I._para._dwGroupID = n._dwGroupID,
                    I._para._strGameName = s,
                    I._para._strCount = p,
                    I._para._strGameRule = this._gameRuleString,
                    I._para._llGameRules = this._llGameRules,
                    I._para._cbFloorIndex = n._cbFloorIndex,
                    I._para._bShowGuide = !!i,
                    I._para._bReset = !1,
                    I._bShowWaiting = !0,
                    1 == r && window.YC.GC.postEvent(a.EventID.GE_UI_SHOW, I)
                } else {
                    window.YC.GC.postEvent(a.EventID.GE_POST_SHARE, {
                        _type: "cancelSetShare"
                    })
                }
            },
            isBtnHuVisible: function() {
                return null != this._gameBtnInfo && !!this._gameBtnInfo._ChildrenNode.btnHu.active
            },
            isBtnLiangXiVisible: function() {
                return null != this._gameBtnInfo && !!this._gameBtnInfo._ChildrenNode.btnLiangxi.active
            },
            isBtnGangVisible: function() {
                return null != this._gameBtnInfo && !!this._gameBtnInfo._ChildrenNode.btnGang.active
            },
            isBtnTingVisible: function() {
                return null != this._gameBtnInfo && !!this._gameBtnInfo._ChildrenNode.btnTing.active
            },
            startChatBarAction: function(e) {
                this.ChatProgressBar.progress = 1;
                var t = e
                  , a = function() {
                    t <= .1 ? (window.YC.GC.getTimer().remove(a),
                    this.ChatProgressBar.progress = 0) : (t -= .1,
                    this.ChatProgressBar.progress = t / e)
                }
                .bind(this);
                window.YC.GC.getTimer().add(a, .1)
            },
            setPromptCardStyle: function(e) {
                this._CardLayer.cancelPromptCardStyle(),
                this._CardLayer.setPromptCardStyle(e)
            },
            cancelPromptCardStyle: function() {
                this._CardLayer.cancelPromptCardStyle()
            },
            OnReady: function() {
                this._gameMode._GameFrame.userReady(),
                this._gameMode.onResetData(),
                this.btnStart.active = !1,
                cc.log("send userRead")
            },
            StartCountDown: function(e) {
                var t = {};
                t._type = g,
                t._para = {},
                t._para._cbStartCountDown = e._cbStartCountDown,
                t._para._timecount = 0,
                t._bShowWaiting = !0,
                1 == e._cbStartCountDown ? o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY_TIME_5S) ? (t._para._timecount = 5,
                window.YC.GC.postEvent(a.EventID.GE_UI_SHOW, t)) : o._and(this._gameMode.getGameInfo()._llGameRule, i.GAME_RULE_AUTOREADY_TIME_10S) ? (t._para._timecount = 10,
                window.YC.GC.postEvent(a.EventID.GE_UI_SHOW, t)) : window.YC.GC.postEvent(a.EventID.GE_UI_HIDE, t) : window.YC.GC.postEvent(a.EventID.GE_UI_HIDE, t)
            },
            ResetSetButton: function() {
                if (window.YC.Player.PlatformID == i.PlatformDefine.PD_MOWANG) {
                    var e = this;
                    e.btnMenu.active = !1;
                    var t = cc.instantiate(e.btnMenu);
                    t.on(cc.Node.EventType.TOUCH_END, function() {
                        e.showMenu()
                    }),
                    t.active = !0,
                    t.x = -15,
                    t.y = -82,
                    e.roomInfoNode.addChild(t)
                }
            },
            showPuFenNode: function(e, t) {
                var a = this;
                null != this._puFenNodeInfo ? null != this._puFenNodeInfo._node && (this._puFenNodeInfo._show = !0,
                this._puFenNodeInfo._node.active = !0,
                this.labelMiao = this._puFenNodeInfo._node.getChildByName("LabelMiao"),
                this.labelMiao.getComponent(cc.Label).string = t,
                this.showPuFentime(t)) : this.loadNodeLayer("_puFenNodeInfo", this._PuFenNodeInfo.ResPath, this._PuFenNodeInfo.zIndex, function() {
                    a._puFenNodeInfo._show && a.refreshPuFenNode(e, t)
                }
                .bind(this))
            },
            refreshPuFenNode: function(e, t) {
                for (var a = 0; a < 6; a++) {
                    var i = this._puFenNodeInfo._node.getChildByName("ToggleContainer").getChildByName("toggle" + a);
                    i.active = a <= e,
                    i.getComponent(cc.Toggle).isChecked = 0 == a,
                    i.on("toggle", this.selectPuFenEvent.bind(this))
                }
                this.puFenSure = this._puFenNodeInfo._node.getChildByName("ButtonSure"),
                this.puFenSure.on(cc.Node.EventType.TOUCH_END, this.clickPuFenSure.bind(this)),
                this._puFenNodeInfo._show = !0,
                this._puFenNodeInfo._node.active = !0,
                this.labelMiao = this._puFenNodeInfo._node.getChildByName("LabelMiao"),
                this.labelMiao.getComponent(cc.Label).string = t,
                this.showPuFentime(t)
            },
            showPuFentime: function(e) {
                var t = this;
                e >= 0 && setTimeout(function() {
                    e -= 1,
                    t.labelMiao.getComponent(cc.Label).string = e,
                    t.showPuFentime(e)
                }, 1e3)
            },
            hidePuFenNode: function() {
                null != this._puFenNodeInfo && (this._puFenNodeInfo._show = !1,
                this._puFenNodeInfo._node.active = !1)
            },
            selectPuFenEvent: function(e) {
                switch (e.node.name) {
                case "toggle0":
                    this.selectPuFen = 0;
                    break;
                case "toggle1":
                    this.selectPuFen = 1;
                    break;
                case "toggle2":
                    this.selectPuFen = 2;
                    break;
                case "toggle3":
                    this.selectPuFen = 3;
                    break;
                case "toggle4":
                    this.selectPuFen = 4;
                    break;
                case "toggle5":
                    this.selectPuFen = 5
                }
            },
            clickPuFenSure: function() {
                this._gameMode.sendUserJiaPu(this.selectPuFen)
            },
            showWaitJiaPu: function(e) {
                if (null != this.waitJiaPuNode)
                    this.waitJiaPuNode.active = e;
                else {
                    var t = this;
                    cc.loader.loadRes("sparrowpinghu/res/JPtishi", cc.SpriteFrame, function(a, i) {
                        t.waitJiaPuNode = new cc.Node,
                        t.waitJiaPuNode.parent = t.node,
                        t.waitJiaPuNode.active = e,
                        t.waitJiaPuNode.addComponent(cc.Sprite).spriteFrame = i
                    })
                }
            },
            setPlayerPuFen: function(e, t) {
                if (this.checkArrayPara(e, this._playerList) && null != this._playerList[e]._view.sp_pufen)
                    if (this._playerList[e]._data._pufen = t,
                    t > 0) {
                        this._playerList[e]._view.sp_pufen.active = !0;
                        var a = this
                          , i = "sparrowpinghu/res/fufen_1";
                        1 == t ? i = "sparrowpinghu/res/fufen_1" : 2 == t ? i = "sparrowpinghu/res/fufen_2" : 3 == t ? i = "sparrowpinghu/res/fufen_3" : 4 == t ? i = "sparrowpinghu/res/fufen_4" : 5 == t && (i = "sparrowpinghu/res/fufen_5"),
                        this._gameMode.loadRes(i, cc.SpriteFrame, function(t, i) {
                            t ? cc.log(t) : a._playerList[e]._view.sp_pufen.getComponent(cc.Sprite).spriteFrame = i._res
                        })
                    } else
                        this._playerList[e]._view.sp_pufen.active = !1
            },
            showCountDown: function() {
                this.centerNode.getChildByName("la_CountDown").active = !0
            },
            setCountDown: function(e) {
                this.centerNode.getChildByName("la_CountDown").getComponent(cc.Label).string = e
            },
            hideCountDown: function() {
                this.centerNode.getChildByName("la_CountDown").active = !1
            }
        }),
        cc._RF.pop()
    }
    , {
        EventDefine: void 0,
        GameRuleLayer: void 0,
        GameView: void 0,
        GlobalDefine: void 0,
        GlobalFunction: void 0,
        UIChatWC: void 0,
        UISelectShare: void 0,
        UIStartCountDown: void 0,
        UIUserInfo: void 0,
        sparrowSetLayer: void 0,
        sparrowpinghuCMD: "sparrowpinghuCMD",
        sparrowpinghuCard: "sparrowpinghuCard",
        sparrowpinghuCreaterRoom: "sparrowpinghuCreaterRoom",
        sparrowpinghuGameConfig: "sparrowpinghuGameConfig",
        sparrowpinghuGameLogic: "sparrowpinghuGameLogic"
    }]
}, {}, ["sparrowpinghuGameRecord", "sparrowpinghuRecordScene", "sparrowpinghuViewRecord", "sparrowpinghuRecordHead", "sparrowpinghuCMD", "sparrowpinghuCard", "sparrowpinghuCardNode", "sparrowpinghuCreateCard", "sparrowpinghuCreaterRoom", "sparrowpinghuDefine", "sparrowpinghuGame", "sparrowpinghuGameConfig", "sparrowpinghuGameLogic", "sparrowpinghuView"]);
