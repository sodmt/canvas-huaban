window.addEventListener('load', function () {
    let canvas = document.querySelector('canvas');
    let shape = document.querySelectorAll('.shape>li');
    let option = document.querySelectorAll('.option>li');
    let style = document.querySelectorAll('.styleBtn');
    let colorstyle = document.querySelectorAll('.colorstyle');
    let lineWidth = document.querySelector('input[type=number]');
    let lineCap = document.querySelector('select');
    let mask = document.querySelector('.mask');
    let eraser = document.querySelector('.eraser');
    let fontBtn = document.querySelector('.fontBtn');
    let clipBtn = document.querySelector('.clipBtn');
    let clip = document.querySelector('.clip');
    // lineCap.forEach(element=>{
    //     console.log(element);
    //    element.onchange=function () {
    //        console.log(this.value);
    //    }
    // });
    lineCap.onchange = function () {
        palette.lineCap = this.value;
    };
    lineWidth.onchange = function () {
        palette.lineWidth = this.value;
    };
    let palette = new Palette(mask, canvas);
    option.forEach(element => {
        element.onclick = function () {
            let type = this.id;
            option.forEach(obj => {
                obj.classList.remove('active')
            });
            this.classList.add('active');
            if (type == 'back') {
                palette.back();
            }
            if (type == 'clear') {
                palette.clear();
            }
            if (type == 'newCanvas') {
                if (confirm('确定要新建画板么？')) {
                    let w = parseInt(prompt('请输入画板宽度'));
                    let h = parseInt(prompt('请输入画板高度'));
                    // document.querySelector('section').innerHTML = '';
                    let section = document.querySelector('section');
                    section.removeChild(canvas);
                    canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    canvas.className = 'canvasStyle';
                    section.insertBefore(canvas, section.firstElementChild);
                    let mask = document.querySelector('.mask');
                    palette = new Palette(mask, canvas);
                    shape[0].onclick();
                }
            }
            if (type == 'save') {
                let type = prompt('保存为');
                let save=document.querySelector('#save>a');
                // palette.save(type);
                save.href=palette.canvas.toDataURL('image/png');
                save.download='1.png';
            }
        }
    });
    shape.forEach(element => {
        element.onclick = function () {
            let type = this.id;
            shape.forEach(obj => {
                obj.classList.remove('active')
            });
            this.classList.add('active');
            if (type == 'ploy' || type == 'ployJ') {
                let num = parseInt(prompt('请输入边数或者角的数量'));
                palette.draw(type, num);
            } else if (type == 'pencil') {
                palette[type]();
            } else if (type == 'eraser') {
                let w = parseInt(prompt('请指定橡皮的大小'));
                palette[type](eraser, w);
                console.log(type);
            } else {
                palette.draw(type);
            }
        }
    });
    shape[0].onclick();
    colorstyle.forEach(element => {
        element.onchange = function () {
            palette[this.id] = this.value;
        }
    });
    style.forEach(element => {
        element.onclick = function () {
            style.forEach(obj => {
                obj.classList.remove('active')
            });
            this.classList.add('active');
            palette.styles = this.id;
        }
    });
    style[1].onclick();
    /////////////////////////////
    fontBtn.addEventListener('click', function () {
        palette.font();
    });
//////////////
    clipBtn.addEventListener('click', function () {
        palette.clip(clip);
    });
    // 撤销
    window.onkeydown = function (e) {
        if (e.ctrlKey && e.key == 'z') {
            if (palette.history.length) {
                palette.history.pop();
                if (palette.history.length > 0) {
                    palette.ctx.putImageData(palette.history[palette.history.length - 1], 0, 0);
                }
            }
        }
    };


});