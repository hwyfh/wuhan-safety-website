// 生成武汉朝闻安全Logo的JavaScript脚本
// 可以在浏览器中运行生成PNG格式的Logo

function generateLogo() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = 512;
    canvas.height = 512;
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a73e8');
    gradient.addColorStop(1, '#34a853');
    
    // 绘制盾牌
    drawShield(ctx, canvas.width / 2, canvas.height / 2, 200, gradient);
    
    // 绘制保护层
    drawProtectionLayer(ctx, canvas.width / 2, canvas.height / 2, 160);
    
    // 绘制中心圆
    drawCenterCircle(ctx, canvas.width / 2, canvas.height / 2, 60);
    
    // 绘制安全对勾
    drawCheckMark(ctx, canvas.width / 2, canvas.height / 2, 40);
    
    // 绘制文字
    drawText(ctx, canvas.width / 2, canvas.height - 50, '武汉朝闻安全', 24, '#1a73e8');
    
    // 返回DataURL
    return canvas.toDataURL('image/png');
}

function drawShield(ctx, centerX, centerY, size, gradient) {
    const points = [];
    const radius = size / 2;
    
    // 生成盾牌形状的点
    for (let i = 0; i < Math.PI * 2; i += 0.01) {
        // 使用椭圆方程创建盾牌形状
        const x = centerX + radius * Math.cos(i) * (1 + 0.2 * Math.sin(i));
        const y = centerY + radius * Math.sin(i) * (1 + 0.15 * Math.cos(i));
        points.push({x, y});
    }
    
    // 绘制盾牌
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    
    // 填充渐变
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // 添加白色边框
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // 添加阴影
    ctx.shadowColor = 'rgba(26, 115, 232, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.stroke();
    ctx.shadowColor = 'transparent';
}

function drawProtectionLayer(ctx, centerX, centerY, size) {
    const innerRadius = size / 2;
    
    // 绘制虚线保护层
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.setLineDash([10, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawCenterCircle(ctx, centerX, centerY, radius) {
    // 绘制白色中心圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // 添加黄色边框
    ctx.strokeStyle = '#fbbc04';
    ctx.lineWidth = 6;
    ctx.stroke();
}

function drawCheckMark(ctx, centerX, centerY, size) {
    const checkSize = size * 0.8;
    
    ctx.beginPath();
    ctx.moveTo(centerX - checkSize/2, centerY);
    ctx.lineTo(centerX - checkSize/6, centerY + checkSize/2);
    ctx.lineTo(centerX + checkSize/2, centerY - checkSize/3);
    
    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function drawText(ctx, x, y, text, fontSize, color) {
    ctx.font = `bold ${fontSize}px 'Noto Sans SC', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 文字阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // 绘制文字
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    
    // 清除阴影
    ctx.shadowColor = 'transparent';
}

// 导出函数
if (typeof module !== 'undefined') {
    module.exports = { generateLogo };
}

// 如果直接在浏览器中运行，自动生成并显示Logo
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        const logoData = generateLogo();
        const img = document.createElement('img');
        img.src = logoData;
        img.alt = '武汉朝闻安全Logo';
        img.style.maxWidth = '100%';
        
        const container = document.createElement('div');
        container.style.textAlign = 'center';
        container.style.padding = '20px';
        container.appendChild(img);
        
        // 创建下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = logoData;
        downloadLink.download = '武汉朝闻安全Logo.png';
        downloadLink.textContent = '点击下载PNG格式Logo';
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '20px';
        downloadLink.style.color = '#1a73e8';
        downloadLink.style.textDecoration = 'none';
        downloadLink.style.fontWeight = 'bold';
        
        container.appendChild(downloadLink);
        document.body.appendChild(container);
        
        console.log('Logo已生成，大小：512x512像素');
    });
}