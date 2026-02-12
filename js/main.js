// 武汉朝闻安全技术咨询有限公司 - 网站交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动导航
    initSmoothScroll();
    
    // 表单提交处理
    initContactForm();
    
    // 动态效果
    initAnimations();
    
    // 移动端菜单（如果需要的话）
    initMobileMenu();
});

// 平滑滚动导航
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 联系表单处理
function initContactForm() {
    const contactForm = document.getElementById('consultForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                email: this.querySelector('input[type="email"]').value,
                service: this.querySelector('select').value,
                message: this.querySelector('textarea').value,
                timestamp: new Date().toISOString()
            };
            
            // 验证表单
            if (!validateForm(formData)) {
                return;
            }
            
            // 显示加载状态
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = '提交中...';
            submitButton.disabled = true;
            
            // 模拟表单提交（实际应该发送到服务器）
            setTimeout(() => {
                // 保存到本地存储（模拟）
                saveConsultation(formData);
                
                // 显示成功消息
                showSuccessMessage();
                
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
}

// 表单验证
function validateForm(data) {
    // 姓名验证
    if (!data.name.trim()) {
        alert('请输入您的姓名');
        return false;
    }
    
    // 电话验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('请输入正确的手机号码');
        return false;
    }
    
    // 邮箱验证（可选）
    if (data.email && !isValidEmail(data.email)) {
        alert('请输入正确的邮箱地址');
        return false;
    }
    
    // 服务类型验证
    if (!data.service) {
        alert('请选择服务类型');
        return false;
    }
    
    return true;
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 保存咨询记录
function saveConsultation(data) {
    try {
        // 获取现有记录
        let consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
        
        // 添加新记录
        consultations.push(data);
        
        // 保存回本地存储
        localStorage.setItem('consultations', JSON.stringify(consultations));
        
        console.log('咨询记录已保存:', data);
    } catch (error) {
        console.error('保存咨询记录时出错:', error);
    }
}

// 显示成功消息
function showSuccessMessage() {
    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #34a853;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            咨询提交成功！我们将尽快联系您。
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(messageDiv);
    
    // 3秒后移除消息
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 500);
    }, 3000);
}

// 初始化动画效果
function initAnimations() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 0';
        }
    });
    
    // 服务卡片悬停效果
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 统计数字动画
    animateStats();
}

// 数字统计动画
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetNumber = parseInt(stat.textContent.replace('+', ''));
                
                // 如果是初次加载，执行动画
                if (!stat.dataset.animated) {
                    animateNumber(stat, targetNumber);
                    stat.dataset.animated = 'true';
                }
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// 数字增长动画
function animateNumber(element, targetNumber) {
    const duration = 2000; // 动画时长2秒
    const startNumber = 0;
    const increment = targetNumber / (duration / 16); // 60fps
    
    let current = startNumber;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 移动端菜单（如果需要的话）
function initMobileMenu() {
    // 这里可以添加移动端菜单的代码
    // 目前使用响应式设计，菜单自动适应
    
    // 检测屏幕宽度
    function checkScreenWidth() {
        if (window.innerWidth <= 768) {
            // 可以在这里添加移动端特定的功能
        }
    }
    
    // 初始检查和监听
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
}

// 工具函数：格式化日期
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 导出函数供外部使用（如果需要的话）
window.WuhanSafety = {
    saveConsultation: saveConsultation,
    formatDate: formatDate
};