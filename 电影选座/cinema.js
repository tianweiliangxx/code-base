const canvas = document.getElementById("cinemaCanvas");
const ctx = canvas.getContext("2d");


const rows = 10;
const cols = 10;
const seatSize = 50;
const seatSpacing = 10;

// 上左边距
const marginTop = 10;
const marginLeft = 10;
const seats = [];

// 选择座位
canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    seats.forEach(row => {
        row.forEach(seat => {
            // 边缘检测
            if (x >= seat.x && x <= seat.x + seatSize && y >= seat.y && y < seat.y + seatSize) {
                if (seat.status === "available") {
                    seat.status = "selected";
                } else if (seat.status === "selected") {
                    seat.status = "available";
                }

                drawSeats()
            }
        })
    })
})

// 优化：悬停座位显示提示信息
canvas.addEventListener("mousemove", event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    let tooltip = ""

    seats.forEach(row => {
        row.forEach(seat => {
            // 边缘检测
            if (x >= seat.x && x <= seat.x + seatSize && y >= seat.y && y < seat.y + seatSize) {
                if (seat.status === "available") {
                    tooltip = "点击选择座位";
                } else if (seat.status === "selected") {
                    tooltip = "点击取消选择";
                }
            }
        })
    })

    canvas.title = tooltip;
})

for (let row = 0; row < rows; row++) {
    const seatRow = [];
    for (let col = 0; col < cols; col++) {
        seatRow.push({
            x: col * (seatSize + seatSpacing) + marginTop,
            y: row * (seatSize + seatSpacing) + marginLeft,
            status: "available"
        })
    }
    seats.push(seatRow);
}

// 根据作为状态获取颜色
function getSeatColor(status) {
    switch (status) {
        case "available":
            return "green";
        case "selected":
            return "blue";
        case "unavailable":
            return "red";
        default:
            return "grey";
    }
}

// 绘制座位
function drawSeats() {
    // 先清除
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    seats.forEach(row => {
        row.forEach(seat => {
            ctx.fillStyle = getSeatColor(seat.status);
            ctx.fillRect(seat.x, seat.y, seatSize, seatSize);
        })
    })
}

drawSeats()