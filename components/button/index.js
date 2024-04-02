export default class ButtonDemo extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
  
      // 创建element节点
      const container = document.createElement("div");
      container.setAttribute("id", "");
      container.innerHTML = `
          <embed id='video_3' class='harmonyEmbed' type='native/video'/>
          `;
  
      shadow.append(container);
  
      this.harmonyEmbed = shadow.querySelector(".harmonyEmbed");
      this.harmonyVideo = shadow.querySelector("#harmonyVideo");
    }
  
    static get observedAttributes() {
      return ["src", "width", "height"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "src") {
        this.harmonyEmbed.src = newValue;
      }
      if (name === "width") {
        this.harmonyEmbed.width = newValue;
        this.width = newValue;
      }
      if (name === "height") {
        this.harmonyEmbed.height = newValue;
        this.width = newValue;
      }
    }
    connectedCallback() {
      const externalClass = this.getAttribute("class");
      this.harmonyVideo.setAttribute("class", externalClass);
      const externalStyle = this.getAttribute("style");
      this.harmonyVideo.setAttribute("style", externalStyle);
  
      const properties = {
        src: this.getAttribute("src"),
        width: this.getAttribute("width"),
        height: this.getAttribute("height"),
        componentId: "video_3",
        controls: true,
        autoPlay: true,
        onClick: (e) => {
          console.log("properties --> onClick", e);
        },
        onPlay: () => {
          console.log("properties --> onPlay");
        },
        onPause: () => {
          console.log("properties --> onPause");
        },
      };
      window.JSBridge.transferSameLayerArgs(properties);
    }
  }
  
  customElements.define("button-demo", ButtonDemo);
  