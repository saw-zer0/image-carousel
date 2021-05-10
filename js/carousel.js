function Carousel(carouselContainer, carouselWidth, transitionTime, holdTime) {
    this.carouselContainer = carouselContainer;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;
    this.carouselWidth = carouselWidth;
    this.imageWrapper = carouselContainer.children[0];
    this.imageWrapper.style.marginLeft = 0;
    this.currentPos = 0;


    this.init = () => {
        this.assignClassName();
        this.addButton();
        this.addBtnEvent();
        this.createDots();
        this.addDotsEvent();
        this.autoSlide();
    }


    this.assignClassName = () => {
        this.carouselContainer.className = 'carousel-container';
        this.carouselContainer.style.width = carouselWidth;
        this.imageWrapper.className = 'image-wrapper';
        this.imageList = document.querySelectorAll('#' + this.carouselContainer.getAttribute('id') + '>.image-wrapper>img');
        for (let i = 0; i < this.imageList.length; i++) {
            this.imageList[i].style.width = this.carouselWidth;
        }
    };

    this.addButton = () => {
        let prev = document.createElement('div');
        prev.innerText = '‹';
        prev.className = 'prev-button';
        let next = document.createElement('div');
        next.innerText = '›';
        next.className = 'next-button';
        this.prev = this.carouselContainer.appendChild(prev);
        this.next = this.carouselContainer.appendChild(next);
    }

    this.createDots = () => {
        let dotsWrapper = document.createElement('div');
        dotsWrapper.className = 'dots-wrapper';
        this.dotsParent = this.carouselContainer.appendChild(dotsWrapper);

        for (let i = 0; i < this.imageList.length; i++) {
            let dots = document.createElement('div');
            dots.className = 'dots';
            this.dotsParent.appendChild(dots);
        }
    }

    this.moveImage = (nextPos) => {
        if (nextPos < 0) {
            nextPos = this.imageList.length - 1;
        }
        if (nextPos > this.imageList.length - 1) {
            nextPos = 0;
        }
        let finalPos = -nextPos * parseFloat(this.carouselContainer.clientWidth);
        let noOfFrames = (60 / 1000) * transitionTime;
        let speed;
        if (nextPos > this.currentPos) {
            speed = -(this.carouselContainer.offsetWidth * Math.abs(this.currentPos - nextPos)) / noOfFrames;
        } else {
            speed = (this.carouselContainer.offsetWidth * Math.abs(this.currentPos - nextPos)) / noOfFrames;
        }
        let animation = () => {
            if (speed < 0) {
                let currentleft = parseFloat(this.imageWrapper.style.marginLeft);
                let left = currentleft + speed;
                if (left < finalPos) {
                    left = finalPos;
                }
                this.imageWrapper.style.marginLeft = left + 'px';
                if (currentleft > finalPos) {
                    window.requestAnimationFrame(animation);
                }
            } else {
                let currentleft = parseFloat(this.imageWrapper.style.marginLeft);
                let left = currentleft + speed;
                if (left > finalPos) {
                    left = finalPos;
                }
                this.imageWrapper.style.marginLeft = left + 'px';
                if (currentleft < finalPos) {
                    window.requestAnimationFrame(animation);
                }
            }

        }
        animation();

        this.currentPos = nextPos;
        this.dotsArr.forEach((elem, index) => {
            if (index === this.currentPos) {
                elem.classList.add('active-dot');
            } else {
                elem.classList.remove('active-dot');
            }
        })
    }

    this.addBtnEvent = () => {
        this.next.addEventListener('click', () => {
            this.moveImage(this.currentPos + 1);
        })

        this.prev.addEventListener('click', () => {
            this.moveImage(this.currentPos - 1);
        })
    }


    this.addDotsEvent = () => {
        this.dotsArr = Array.from(document.querySelectorAll('#' + this.carouselContainer.getAttribute('id') + '>.dots-wrapper>.dots'));
        console.log(this.dotsArr)
        this.dotsArr.forEach((elem, index) => {
            elem.addEventListener('click', () => {
                this.moveImage(index);
            })
        })

        this.dotsArr.forEach(elem => {
            let currentDotSize = elem.offsetWidth;
            elem.addEventListener('mouseover', () => {

                let animate = () => {
                    let growth = elem.offsetWidth + 1;
                    elem.style.width = growth + 'px';
                    elem.style.height = growth + 'px';

                    if (elem.offsetWidth < currentDotSize * 1.3) {
                        window.requestAnimationFrame(animate);
                    }
                }
                animate();
            })
            elem.addEventListener('mouseout', () => {
                let animate = () => {
                    let shrink = elem.offsetWidth - 1;
                    elem.style.width = shrink + 'px';
                    elem.style.height = shrink + 'px';
                    if (elem.offsetWidth > currentDotSize) {
                        window.requestAnimationFrame(animate);
                    }
                }
                animate();
            })
        })
    }

    this.autoSlide = () => {
        let interval = setInterval(() => {
            this.moveImage(this.currentPos + 1);
        }, this.holdTime);
    }

    this.init();
}