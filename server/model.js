var { Sequelize } = require("sequelize")

// 사용자
global.User = sequelize.define('user', {
    // 이메일
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    // 닉네임
    nickname: {
        type: Sequelize.STRING
    },
    // 패스워드
    password: {
        type: Sequelize.STRING
    },
    // 계좌 유형
    bankType: {
        type: Sequelize.STRING
    },
    // 계좌 번호
    bankNumber: {
        type: Sequelize.STRING
    },
});

// 위치
global.Location = sequelize.define('location', {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // 건물명
    name: {
        type: Sequelize.STRING,
    },
    // x좌표
    lat: {
        type: Sequelize.DOUBLE,
    },
    // y좌표
    lng: {
        type: Sequelize.DOUBLE,
    },
    // 도로명 주소
    address: {
        type: Sequelize.STRING,
    },
    // 상세 주소
    detailAddress: {
        type: Sequelize.STRING,
    },

}, {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
})


// 카테고리
global.Category = sequelize.define('Category', {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    // 카데고리 명
    name: {
        type: Sequelize.STRING

    },
}, {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
})

// 가게
global.Market = sequelize.define('market', {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    // 가게 이름
    name: {
        type: Sequelize.STRING

    },
    // 가게 주소
    address: {
        type: Sequelize.STRING
    },
    // 가게 번호
    telephone: {
        type: Sequelize.STRING
    },
    // 가게 썸네일
    firstImage: {
        type: Sequelize.STRING
    },
    // 가게 운영 시간
    time: {
        type: Sequelize.STRING
    },
    // 가게 최소주문금액
    mOrder: {
        type: Sequelize.INTEGER
    },
    // 가게 배달비
    deliveryPrice: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

// 메뉴
global.Menu = sequelize.define('menu', {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    // 메뉴 이름
    s_menu: {
        type: Sequelize.STRING
    },
    // 메뉴 가격
    m_price: {
        type: Sequelize.INTEGER
    },
    // 메뉴 소개
    m_introduce: {
        type: Sequelize.STRING
    },
    // 메뉴 이미지
    m_image: {
        type: Sequelize.STRING
    }
}, {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

// 장바구니
global.Basket = sequelize.define('basket', {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    // 메뉴 수량
    m_count: {
        type: Sequelize.INTEGER
    }
}, {
    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
});

global.Order = sequelize.define("Order", {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    // x좌표
    lat: {
        type: Sequelize.DOUBLE,
    },
    // y좌표
    lng: {
        type: Sequelize.DOUBLE,
    },
    // 건물명
    address: {
        type: Sequelize.STRING
    },
    // 상세주소
    detailAddress: {
        type: Sequelize.STRING
    },
    // 주문 상태
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1      //1: 주문 2: 매장승인? 3: 배달시작?
    },
    // 생성 날짜
    orderDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },


})

// 주문 메뉴
global.OrderMenu = sequelize.define("OrderMenu", {
    // 주문 메뉴 수량
    count: {
        type: Sequelize.INTEGER,
    }
}, {
    createdAt: false,
    updatedAt: false
})

// 대기 클러스터
global.Cluster = sequelize.define("Cluster", {
    // id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // 생성 시간
    createDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
})

// 외래키 설정
// 장바구니 외래키(사용자 이메일)
User.hasOne(Basket, {
    as: "basket",
    foreignKey: "u_email"
})

// 주문테이블 외래키(사용자 이메일)
User.hasMany(Order, {
    as: "orders",
    foreignKey: "userId"
})

// 위치테이블 외래키(사용자 이메일)
Location.belongsTo(User, {
    as: "users",
    foreignKey: "u_email"
})

// 장바구니테이블 외래키(가게 id))
Basket.belongsTo(Market, {
    as: "markets",
    foreignKey: "s_id"
})

// 장바구니테이블 외래키(가게 메뉴 id))
Basket.belongsTo(Menu, {
    as: "menus",
    foreignKey: "m_id"
})

// 가게테이블 외래키(카테고리 id)
Category.hasMany(Market, {
    as: "markets",
    foreignKey: "marketId"
})

// 가게테이블 외래키(가게 id)
Market.hasMany(Menu, {
    as: "menus",
    foreignKey: "menu_id"
})

Order.belongsToMany(Menu, {
    as: "menus",
    through: OrderMenu
})

// 주문메뉴 테이블 외래키(메뉴 id)
OrderMenu.belongsTo(Menu, {
    as: "menus",
    foreignKey: "menuId"
})
// 주문메뉴 테이블 외래키(주문 id)
OrderMenu.belongsTo(Order, {
    as: "order",
    foreignKey: "OrderId"
})

// 주문테이블 외래키(가게 id)
Order.belongsTo(Market, {
    as: "market",
    foreignKey: "marketId"
})

// 주문테이블 외래키(클러스터 id)
Cluster.hasMany(Order, {
    as: "orders",
    foreignKey: "clusterId"
})

Order.belongsTo(Cluster, {
    as: "cluster",
    foreignKey: "clusterId"
})
Order.belongsTo(User, {
    as: "user",
    foreignKey: "userId"
})

// Model synchronization
sequelize.sync({
    alter: true,
    timestamps: false
})