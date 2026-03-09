export default class YoutubeTool {
    
  static get toolbox() {
    return {
      title: "YouTube",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M10 15l5-3-5-3v6z"/>
        <path d="M21 7s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C15.2 4 12 4 12 4h0s-3.2 0-6.1.1c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S3 8.6 3 10.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.9.8 2.4.9C8.3 18 12 18 12 18s3.2 0 6.1-.1c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2z"/>
      </svg>`
    };
  }

  constructor({ data }) {
    this.data = data;
  }

  static get pasteConfig() {
    return {
      patterns: {
        youtube: /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/.+/
      }
    };
  }

  render() {
    const wrapper = document.createElement("div");

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "400";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;

    const videoId = this.extractVideoId(this.data.url);

    iframe.src = `https://www.youtube.com/embed/${videoId}`;

    wrapper.appendChild(iframe);

    return wrapper;
  }

  extractVideoId(url) {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  }

  save() {
    return this.data;
  }

  onPaste(event) {
    const url = event.detail.data;

    this.data = {
      url
    };
  }
}