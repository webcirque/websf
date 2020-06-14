// Start of the rendering library
// Rely on elsl.media.subtitles
// Debug at https://code.sololearn.com/Wh0xx6jn46p0/#js
Subtitles.prototype.render = function (time, vid, face) {
    vid = vid || this.monitor;
    time = time || this.monitor.currentTime;
    face = face || this.renderFace;
    // Erase former data
    face.innerHTML = "";
    let subAr = this.currentSub(time);
    let count = 0;
    while (count < subAr.length) {
        let subItem = document.createElement("div");
        if (!(subAr[count].prop.position && subAr[count].prop.line)) {
            // Default subtitle rendering
            let subCon = document.createElement("span");
            let subText = subAr[count].text;
            while (subText.search("\n") != -1) {
                subText = subText.replace("\n", "<br/>");
            }
            subCon.innerHTML = subText;
            if (subAr[count].prop.align) {
                subItem.style.textAlign = subAr[count].prop.align.toLowerCase();
            } else {
                subItem.style.textAlign = "center";
            }
            subItem.appendChild(subCon);
        }
        face.appendChild(subItem);
        count ++;
    }
    let owidth = vid.width;
    let oheight = vid.height;
    if (vid.clientWidth >= vid.width) {
        // Use clientHeight as resizing benchmark
        owidth = Math.round(vid.clientHeight / vid.height * vid.width);
        oheight = vid.clientHeight;
    } else if (vid.clientHeight >= vid.height) {
        // Use clientWidth as resizing benchmark
        oheight = Math.round(vid.clientWidth / vid.width * vid.height);
        owidth = vid.clientWidth;
    }
    face.style.width = owidth.toString() + "px";
    face.style.height = oheight.toString() + "px";
    return this;
}
// End
