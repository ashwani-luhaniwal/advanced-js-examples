var ConversationalForm = function() {
  function t() {}
  return t
}(),
ConversationalFormDocs = function() {
  function t() {
      this.introTimer = 0, this.el = document.querySelector("main.content"), null !== document.getElementById("conversational-form-development") && this.el.classList.add("development"), this.h1writer = new H1Writer({
          el: document.getElementById("writer")
      }), "none" != window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display") ? this.introFlow1() : this.introFlow2()
  }
  return t.prototype.introFlow1 = function() {
      var t = this,
          e = null !== document.getElementById("conversational-form-development");
      this.introTimer = setTimeout(function() {
          t.toggleMenuState(), t.h1writer.start(), t.introTimer = setTimeout(function() {
              t.toggleConversation()
          }, e ? 0 : 2500)
      }, e ? 0 : 500)
  }, t.prototype.introFlow2 = function() {
      var t = this,
          e = null !== document.getElementById("conversational-form-development");
      this.h1writer.start(), this.introTimer = setTimeout(function() {
          document.getElementById("info").classList.add("show"), t.introTimer = setTimeout(function() {
              document.querySelector("section[role='form']").classList.add("show"), document.getElementById("cf-toggle-btn").classList.add("show"), t.introTimer = setTimeout(function() {
                  t.toggleConversation()
              }, e ? 0 : 1500)
          }, e ? 0 : 3e3)
      }, e ? 0 : 1500)
  }, t.prototype.toggleMenuState = function() {
      return this.el.classList.toggle("menu-toggle", !this.el.classList.contains("menu-toggle")) && this.el.classList.remove("cf-toggle"), !1
  }, t.prototype.toggleConversation = function() {
      var t = this;
      if (clearTimeout(this.introTimer), this.el.classList.contains("cf-toggle")) this.el.classList.remove("cf-toggle");
      else {
          if (!this.cf) {
              var e = document.getElementById("cf-form"),
                  n = {},
                  o = new window.cf.EventDispatcher,
                  i = null,
                  s = null,
                  r = null,
                  c = "",
                  a = -1 !== window.location.pathname.toLowerCase().indexOf("index-voice");
              if (this.canUseMicrophone() && a) {
                  n = {
                      init: function() {
                          i = window.speechSynthesis, r = new window.SpeechSynthesisUtterance;
                          var e = function() {
                              if (void 0 !== i)
                                  for (var t = i.getVoices(), e = 0; e < t.length; e++) {
                                      var n = t[e];
                                      "alex" == n.name.toLowerCase() && (r.voice = n, r.lang = r.voice.lang)
                                  }
                          };
                          e(), void 0 !== i && void 0 !== i.onvoiceschanged && (i.onvoiceschanged = e), r.onstart = function(e) {
                              console.log("voice: deactivate 1"), t.cf.userInput.deactivate()
                          }, r.onend = function(e) {
                              t.cf.userInput.reactivate()
                          }, o.addEventListener(window.cf.ChatListEvents.CHATLIST_UPDATED, function(t) {
                              t.detail.currentResponse.isRobotResponse && (r.text = t.detail.currentResponse.strippedSesponse, i.speak(r))
                          }, !1)
                      },
                      awaitingCallback: !0,
                      cancelInput: function(t) {
                          console.log("voice: CANCEL"), c = null, s && (s.onend = null, s.onerror = null, s.stop())
                      },
                      input: function(t, e, n) {
                          console.log("voice: INPUT"), s && s.stop(), s = new window.SpeechRecognition, c = "", s.continuous = !1, s.interimResults = !1, s.onresult = function(t) {
                              for (var e = t.resultIndex; e < t.results.length; ++e) t.results[e].isFinal && (c += t.results[e][0].transcript)
                          }, s.onerror = function(t) {
                              e(t.error)
                          }, s.onend = function(e) {
                              c && "" !== c && t(c)
                          }, s.start()
                      }
                  };
                  var l = e.querySelector("input[type='email']");
                  l && l.parentNode && l.parentNode.removeChild(l)
              }
              var g = function(e) {
                  void 0 === e && (e = null);
                  var n = new XMLHttpRequest;
                  n.addEventListener("load", function() {
                      t.cf.addRobotChatResponse("We received your submission 🙌"), e && e()
                  }), n.open("POST", document.getElementById("cf-form").getAttribute("action")), n.setRequestHeader("accept", "application/javascript"), n.setRequestHeader("Content-Type", "application/json"), n.send(JSON.stringify(t.cf.getFormData(!0)))
              };
              this.cf = new window.cf.ConversationalForm({
                  formEl: e,
                  eventDispatcher: o,
                  microphoneInput: n,
                  context: document.getElementById("cf-context"),
                  robotImage: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                  userImage: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                  submitCallback: function() {
                      a || g()
                  },
                  flowStepCallback: function(e, n, o) {
                      console.log("flowStepCallback", e), e.tag && "repeat-voice" == e.tag.name ? "no" !== e.tag.value[0] ? location.reload() : (t.cf.addRobotChatResponse("No problem. Talk soon"), t.cf.doSubmitForm()) : e.tag && e.tag.domElement ? "repeat" == e.tag.domElement.getAttribute("name") ? location.reload() : "submit-form" == e.tag.domElement.getAttribute("name") ? g(n) : n() : n()
                  }
              })
          }
          this.cf.focus(), setTimeout(function() {
              t.el.classList.remove("menu-toggle"), t.el.classList.add("cf-toggle")
          }, 10)
      }
      return !1
  }, t.prototype.canUseMicrophone = function() {
      var t = !0;
      try {
          window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      } catch (e) {
          t = !1
      }
      try {
          window.SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance
      } catch (e) {
          t = !1
      }
      return t
  }, t.start = function() {
      t.instance || (window.conversationalFormDocs = new t)
  }, t
}(),
H1Writer = function() {
  function t(t) {
      this.progress = 0, this.progressTarget = 0, this.str = "", this.strs = ["...", "TBD"], this.step = 0, this.el = t.el, this.strs[1] = this.el.innerHTML, this.el.innerHTML = "", this.el.classList.add("show")
  }
  return t.prototype.start = function() {
      this.progress = 0, this.progressTarget = 1, this.str = this.strs[this.step], this.render()
  }, t.prototype.nextStep = function() {
      0 == this.progressTarget && this.step++, this.str = this.strs[this.step], this.progressTarget = 0 == this.progressTarget ? 1 : 0, this.render()
  }, t.prototype.render = function() {
      var t = this;
      this.progress += (this.progressTarget - this.progress) * (0 == this.step ? .15 : .09);
      var e = this.str.substr(0, Math.round(this.progress * this.str.length));
      this.el.innerHTML = e, Math.abs(this.progress - this.progressTarget) <= .01 ? (cancelAnimationFrame(this.rAF), this.step < 1 && setTimeout(function() {
          t.nextStep()
      }, 500)) : this.rAF = window.requestAnimationFrame(function() {
          return t.render()
      })
  }, t
}();
"complete" == document.readyState ? ConversationalFormDocs.start() : window.addEventListener("load", function() {
ConversationalFormDocs.start()
}, !1);