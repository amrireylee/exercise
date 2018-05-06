DROP TABLE IF EXISTS `exercise_user`;

CREATE TABLE `exercise_user`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户表id',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '用户密码，MD5加密',
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '最后一次更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_unique` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- 创建权限表exercise_role
-- ----------------------------
DROP TABLE IF EXISTS `exercise_role`;
CREATE TABLE `exercise_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role` varchar(40) NOT NULL DEFAULT '',
  `descpt` varchar(40) NOT NULL DEFAULT '' COMMENT '角色描述',
  `category` varchar(40) NOT NULL DEFAULT '' COMMENT '分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- 加入4个操作权限
-- ----------------------------
/*INSERT INTO `t_role` VALUES ('1', 'ROLE_ADMIN', '系统管理员', '系统管理员');
INSERT INTO `t_role` VALUES ('2', 'ROLE_UPDATE_FILM', '修改', '影片管理');
INSERT INTO `t_role` VALUES ('3', 'ROLE_DELETE_FILM', '删除', '影片管理');
INSERT INTO `t_role` VALUES ('4', 'ROLE_ADD_FILM', '添加', '影片管理');*/

-- ----------------------------
-- 创建权限组表
-- ----------------------------
DROP TABLE IF EXISTS `exercise_group`;
CREATE TABLE `exercise_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `groupname` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- 添加2个权限组
-- ----------------------------
/*INSERT INTO `t_group` VALUES ('1', 'Administrator');
INSERT INTO `t_group` VALUES ('2', '影片维护');*/

-- ----------------------------
-- 创建权限组对应权限表exercise_group_role
-- ----------------------------
DROP TABLE IF EXISTS `exercise_group_role`;
CREATE TABLE `exercise_group_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `groupid` bigint(20) unsigned NOT NULL,
  `roleid` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groupid2` (`groupid`,`roleid`),
  KEY `roleid` (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

-- ----------------------------
-- 加入权限组与权限的对应关系
-- ----------------------------
/*INSERT INTO `t_group_role` VALUES ('1', '1', '1');
INSERT INTO `t_group_role` VALUES ('2', '2', '2');
INSERT INTO `t_group_role` VALUES ('4', '2', '4');*/

-- ----------------------------
-- 创建管理员所属权限组表t_group_user
-- ----------------------------
DROP TABLE IF EXISTS `exercise_group_role`;
CREATE TABLE `exercise_group_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` bigint(20) unsigned NOT NULL,
  `groupid` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `groupid` (`groupid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- 将管理员加入权限组
-- ----------------------------
/*INSERT INTO `t_group_user` VALUES ('1', '1', '1');
INSERT INTO `t_group_user` VALUES ('2', '4', '2');*/

-- ----------------------------
-- 创建管理员对应权限表exercise_user_role
-- 设置该表可跳过权限组，为管理员直接分配权限
-- ----------------------------
DROP TABLE IF EXISTS `exercise_group_role`;
CREATE TABLE `exercise_user_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userid` bigint(20) unsigned NOT NULL,
  `roleid` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `roleid` (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

