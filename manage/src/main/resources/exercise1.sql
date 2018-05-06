CREATE TABLE `exercise_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户表id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '用户密码，MD5加密',
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `url` VARCHAR(4) DEFAULT NULL COMMENT '重置密码验证码',
  `role` int(4) NOT NULL COMMENT '角色0-管理员,1-会员,2-游客',
  `vip_status` INT(4) NOT NULL COMMENT '会员是否办卡标志位：0：办理，1：未办理',
  `create_time` datetime NOT NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_unique` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_user_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int(11) NOT NULL COMMENT '用户表id',
  `start_time` DATETIME NOT NULL COMMENT '有效期开始时间',
  `end_time` DATETIME NOT NULL COMMENT '有效期截止时间',
  `lost_status` INT(2) DEFAULT '0' COMMENT ' 是否挂失：0：没有挂失，1：挂失',
  `use_status` INT(2) DEFAULT '0' COMMENT ' 是否可用：0：可用，1：不可用',
  `del_flag` INT(2) DEFAULT '0' COMMENT '是否退卡：0：存在，1：退卡，即删除',
  `create_time` datetime NOT NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目表id',
  `name` VARCHAR(200) NOT NULL COMMENT '项目名称',
  `desc` VARCHAR(500) NOT NULL COMMENT '项目描述',
  `del_flag` INT(2) DEFAULT '0' COMMENT '删除标志位：0：存在，1：删除',
  `create_time` datetime NOT NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程表id',
  `name` VARCHAR(200) NOT NULL COMMENT '课程名称',
  `desc` VARCHAR(500) NOT NULL COMMENT '课程描述',
  `project_id` INTEGER(11) NOT NULL COMMENT '项目id',
  `start_time` DATETIME NOT NULL COMMENT '开始时间',
  `end_time` DATETIME NOT NULL COMMENT '截止时间',
  `place_id` INT(11) NOT NULL COMMENT '场地id',
  `course_time` INT(4) NOT NULL COMMENT '课时',
  `user_id` INT(11) NOT NULL COMMENT '教练id',
  `money` DECIMAL(12,2) DEFAULT NULL COMMENT '费用',
  `img` varchar(500) DEFAULT NULL COMMENT '图片',
  `del_flag` INT(2) DEFAULT '0' COMMENT '删除标志位：0：存在，1：删除',
  `create_time` datetime NOT NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_id` (`project_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_time`(
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '时间段id',
  `desc` VARCHAR(50) NOT NULL COMMENT '时间段：1:8:00-10:00，2:10:00-12:00，3:12:00-14:00，4:14:00-16:00，5:16:00-18:00，6:18:00-20:00，7:20:00-22:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_place` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '场地表id',
  `name` VARCHAR(200) NOT NULL COMMENT '场地名称',
  `desc` VARCHAR(500) NOT NULL COMMENT '场地描述',
  `user_id` INT(11) NOT NULL COMMENT '教练id',
  `use_status` INT(2) DEFAULT '0' COMMENT ' 是否可用：0：可用-闲暇，1：不可用-繁忙',
  `del_flag` INT(2) DEFAULT '0' COMMENT '删除标志位：0：存在，1：删除',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_place_reserve`(
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'placeId',
  `place_id` int(11) NOT NULL COMMENT '场地表id',
  `name` VARCHAR(200) NOT NULL COMMENT '内容',
  `start_time` DATETIME NOT NULL COMMENT '使用开始时间',
  `end_time`DATETIME NOT NULL COMMENT '结束时间',
  `use_status` INT(2) DEFAULT '0' COMMENT ' 是否可用：0：可用-闲暇，1：不可用-繁忙',
  `user_id` INT(11) NOT NULL NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_no` bigint(20) DEFAULT NULL COMMENT '订单号',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `payment` decimal(20,2) DEFAULT NULL COMMENT '实际付款金额,单位是元,保留两位小数',
  `payment_type` int(4) DEFAULT NULL COMMENT '支付类型,1-在线支付,2-现金，3-刷卡',
  `status` int(10) DEFAULT NULL COMMENT '订单状态:0-已取消-10-未付款，20-已付款，50-交易成功，60-交易关闭',
  `remark` TEXT DEFAULT NULL COMMENT '订单备注',
  `payment_time` datetime DEFAULT NULL COMMENT '支付时间',
  `end_time` datetime DEFAULT NULL COMMENT '交易完成时间',
  `close_time` datetime DEFAULT NULL COMMENT '交易关闭时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no_index` (`order_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8;

CREATE TABLE `exercise_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单子表id',
  `user_id` int(11) DEFAULT NULL,
  `order_no` bigint(20) DEFAULT NULL,
  `project_id` int(11) NOT NULL COMMENT '项目id',
  `project_name` varchar(100) DEFAULT NULL COMMENT '项目名称',
  `course_id` int(11) DEFAULT NULL COMMENT '，课程id',
  `current_unit_price` decimal(12,2) DEFAULT NULL COMMENT '生成订单时的课程单价，单位是元,保留两位小数',
  `total_price` decimal(20,2) DEFAULT NULL COMMENT '总价,单位是元,保留两位小数',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_no_index` (`order_no`) USING BTREE,
  KEY `order_no_user_id_index` (`user_id`,`order_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

