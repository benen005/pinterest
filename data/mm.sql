
DROP TABLE IF EXISTS `photo`;
DROP TABLE IF EXISTS `photo_comment`;
DROP TABLE IF EXISTS `photo_tag`;

CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `title` varchar(32) NOT NULL DEFAULT '',
  `tags` varchar(128) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `city_want_num` int(11) NOT NULL DEFAULT '0',
  `pubtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_out` tinyint(4) NOT NULL DEFAULT '0',
  `addr` varchar(255) NOT NULL DEFAULT '',
  `comment_num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

CREATE TABLE `photo_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,         /* id  */
  `photo_id` int(11) NOT NULL DEFAULT '0',       /* 属于城市照片id */
  `user_id` int(11) NOT NULL DEFAULT '0',       /* user id */
  `content` text NOT NULL,                      /* 内容 */
  `pubtime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',  /* 发布时间 */
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 
CREATE TABLE `photo_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `tag` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
