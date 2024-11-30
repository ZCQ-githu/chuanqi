// 轮播图功能
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelector('.carousel-dots');
        this.currentSlide = 0;
        this.isPlaying = true;
        this.interval = null;
        
        this.init();
    }

    init() {
        // 创建导航点
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dots.appendChild(dot);
        });

        // 设置按钮事件
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        document.querySelector('.carousel-play-pause').addEventListener('click', () => this.togglePlay());

        // 开始自动播放
        this.startAutoPlay();
        this.updateDots();
    }

    startAutoPlay() {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.nextSlide(), 5000);
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const btn = document.querySelector('.carousel-play-pause');
        btn.textContent = this.isPlaying ? '暂停' : '播放';
        
        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            clearInterval(this.interval);
        }
    }

    updateDots() {
        const dots = this.dots.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
}

// 聊天功能
class Chat {
    constructor() {
        this.messagesContainer = document.querySelector('.chat-messages');
        this.textarea = document.querySelector('textarea');
        this.sendBtn = document.querySelector('.send-btn');
        
        this.init();
    }

    init() {
        this.textarea.addEventListener('input', () => {
            this.sendBtn.disabled = !this.textarea.value.trim();
        });

        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const message = this.textarea.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage(message, 'user-message');
        this.textarea.value = '';
        this.sendBtn.disabled = true;

        // 模拟AI回复
        setTimeout(() => {
            this.addMessage('这是AI的回复消息', 'ai-message');
        }, 1000);
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    new Chat();
}); 