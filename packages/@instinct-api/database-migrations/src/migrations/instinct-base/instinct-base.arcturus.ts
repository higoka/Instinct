export const instinctBaseSQL = `
  SET NAMES utf8mb4;
  SET FOREIGN_KEY_CHECKS = 0;
  
  DROP TABLE IF EXISTS \`instinct_article_comments\`;
  CREATE TABLE \`instinct_article_comments\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`user_id\` int(11) DEFAULT NULL,
    \`article_id\` int(11) DEFAULT NULL,
    \`content\` text DEFAULT NULL,
    \`timestamp\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`article_comment.user\` (\`user_id\`) USING BTREE,
    KEY \`artice_comment.article\` (\`article_id\`) USING BTREE,
    CONSTRAINT \`instinct_article_comments_ibfk_1\` FOREIGN KEY (\`article_id\`) REFERENCES \`instinct_articles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`instinct_article_comments_ibfk_2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_articles\`;
  CREATE TABLE \`instinct_articles\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`title\` varchar(255) DEFAULT NULL,
    \`description\` varchar(255) DEFAULT NULL,
    \`content\` text DEFAULT NULL,
    \`category_id\` int(11) DEFAULT NULL,
    \`header_image\` varchar(255) DEFAULT NULL,
    \`thumbnail_image\` varchar(255) DEFAULT NULL,
    \`timestamp\` int(11) DEFAULT NULL,
    \`user_id\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`article.category\` (\`category_id\`) USING BTREE,
    CONSTRAINT \`instinct_articles_ibfk_1\` FOREIGN KEY (\`category_id\`) REFERENCES \`instinct_categories\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_beta_codes\`;
  CREATE TABLE \`instinct_beta_codes\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`beta_code\` varchar(255) NOT NULL,
    \`user_id\` int(11) NOT NULL,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`beta_code.user\` (\`user_id\`) USING BTREE,
    CONSTRAINT \`instinct_beta_codes_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_categories\`;
  CREATE TABLE \`instinct_categories\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`name\` varchar(255) DEFAULT NULL,
    \`color\` varchar(255) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
  
  INSERT INTO \`instinct_categories\` VALUES (2, 'Announcements', '#4a90e2');
  INSERT INTO \`instinct_categories\` VALUES (3, 'Updates', '#2282e9');
  
  DROP TABLE IF EXISTS \`instinct_config\`;
  CREATE TABLE \`instinct_config\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`site_name\` varchar(255) DEFAULT NULL,
    \`site_link\` varchar(255) DEFAULT NULL,
    \`site_beta\` tinyint(4) DEFAULT NULL,
    \`emulator_ip\` varchar(255) DEFAULT NULL,
    \`emulator_port\` varchar(255) DEFAULT NULL,
    \`loading_message\` varchar(255) DEFAULT NULL,
    \`group_badge_url\` varchar(255) DEFAULT NULL,
    \`sendgrid_api_key\` varchar(255) DEFAULT NULL,
    \`sendgrid_api_sender\` varchar(255) DEFAULT NULL,
    \`sendgrid_template_forgot_password\` varchar(255) DEFAULT NULL,
    \`google_recaptcha_site_key\` varchar(255) DEFAULT NULL,
    \`google_recaptcha_secret_key\` varchar(255) DEFAULT NULL,
    \`websocket_enabled\` tinyint(4) DEFAULT NULL,
    \`websocket_ip\` varchar(255) DEFAULT NULL,
    \`websocket_port\` varchar(255) DEFAULT NULL,
    \`nitro_url\` varchar(255) DEFAULT NULL,
    \`discord_url\` varchar(255) DEFAULT NULL,
    \`rank_badge_url\` varchar(255) DEFAULT NULL,
    \`maintenance_enabled\` tinyint(255) DEFAULT 0,
    \`swf_habbo\` varchar(255) DEFAULT NULL,
    \`swf_external_variables\` varchar(255) DEFAULT NULL,
    \`swf_external_texts\` varchar(255) DEFAULT NULL,
    \`swf_productdata\` varchar(255) DEFAULT NULL,
    \`swf_furnidata\` varchar(255) DEFAULT NULL,
    \`swf_figuredata\` varchar(255) DEFAULT NULL,
    \`swf_base_url\` varchar(255) DEFAULT NULL,
    \`swf_badge_url\` varchar(255) DEFAULT NULL,
    \`findretros_username\` varchar(255) DEFAULT NULL,
    \`twitter_url\` varchar(255) DEFAULT NULL,
    \`stripe_public_key\` varchar(255) DEFAULT NULL,
    \`stripe_secret_key\` varchar(255) DEFAULT NULL,
    \`logo_url\` varchar(255) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
  
  INSERT INTO \`instinct_config\` VALUES (1, 'Nex', 'https://nexhotel.net', 0, '155.138.174.244', '3003', '123', 'https://swfs.nexhotel.net/c_images', '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', 'support@nexhotel.net', 'd-00f76f0ef72a4d55bfb369b6d93d4f06 ', '6Lel99UZAAAAAIxE0dhadc5UaU1zBc8jvjN6OW1s', '6Lel99UZAAAAAHBL5MkkX_mOkZ60KDAESvvgU7ty', 0, NULL, NULL, 'https://game.nexhotel.net', 'https://discord.gg/', 'https://swfs.nexhotel.net/c_images/album1584', 0, 'https://swfs.nexhotel.net/gordon/Habbo.swf', 'https://swfs.nexhotel.net/gamedata/external_variables.txt', 'https://swfs.nexhotel.net/gamedata/external_flash_texts.txt', 'https://swfs.nexhotel.net/gamedata/productdata.txt', 'https://swfs.nexhotel.net/gamedata/furnidata.xml', 'https://swfs.nexhotel.net/gamedata/figuredata.xml', 'https://swfs.nexhotel.net/gordon/', NULL, '', 'https://twitter.com/Nex_RPHotel', 'pk_live_wMey6h77WjJpv6d0BkZKP0UV', 'sk_live_3U8WhW99j19Bv9odp177miPV', NULL);
  
  DROP TABLE IF EXISTS \`instinct_forum_posts\`;
  CREATE TABLE \`instinct_forum_posts\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`section_id\` int(11) NOT NULL,
    \`user_id\` int(11) NOT NULL,
    \`title\` varchar(255) DEFAULT NULL,
    \`body\` varchar(255) DEFAULT NULL,
    \`created_at\` int(255) DEFAULT NULL,
    \`updated_at\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`forum_post.section\` (\`section_id\`),
    KEY \`forum_post.user\` (\`user_id\`),
    CONSTRAINT \`forum_post.section\` FOREIGN KEY (\`section_id\`) REFERENCES \`instinct_forum_sections\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`forum_post.user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_forum_reactions\`;
  CREATE TABLE \`instinct_forum_reactions\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`post_id\` int(11) DEFAULT NULL,
    \`reply_id\` int(11) DEFAULT NULL,
    \`type\` varchar(255) NOT NULL,
    \`created_at\` int(255) NOT NULL,
    \`user_id\` int(11) NOT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`forum_reactions.post\` (\`post_id\`),
    KEY \`forum_reactions.reply\` (\`reply_id\`),
    KEY \`forum_reactions.user\` (\`user_id\`),
    CONSTRAINT \`forum_reactions.post\` FOREIGN KEY (\`post_id\`) REFERENCES \`instinct_forum_posts\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`forum_reactions.reply\` FOREIGN KEY (\`reply_id\`) REFERENCES \`instinct_forum_replies\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`forum_reactions.user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_forum_replies\`;
  CREATE TABLE \`instinct_forum_replies\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`post_id\` int(11) NOT NULL,
    \`user_id\` int(11) NOT NULL,
    \`content\` text NOT NULL,
    \`created_at\` int(11) NOT NULL,
    \`updated_at\` int(11) NOT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`forum_reply.post\` (\`post_id\`),
    KEY \`forum_reply.user\` (\`user_id\`),
    CONSTRAINT \`forum_reply.post\` FOREIGN KEY (\`post_id\`) REFERENCES \`instinct_forum_posts\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`forum_reply.user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_forum_sections\`;
  CREATE TABLE \`instinct_forum_sections\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`section_id\` int(11) DEFAULT NULL,
    \`title\` varchar(255) NOT NULL,
    \`description\` text NOT NULL,
    \`icon\` varchar(255) DEFAULT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`forum_section.parent\` (\`section_id\`),
    CONSTRAINT \`forum_section.parent\` FOREIGN KEY (\`section_id\`) REFERENCES \`instinct_forum_sections\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
  
  DROP TABLE IF EXISTS \`instinct_shop_packages\`;
  CREATE TABLE \`instinct_shop_packages\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`title\` varchar(255) DEFAULT NULL,
    \`icon\` varchar(255) DEFAULT NULL,
    \`description\` varchar(255) DEFAULT NULL,
    \`content\` varchar(255) DEFAULT NULL,
    \`value\` decimal(10,0) DEFAULT NULL,
    \`rank_id\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`),
    KEY \`instinct_shop_package.rank\` (\`rank_id\`),
    CONSTRAINT \`instinct_shop_package.rank\` FOREIGN KEY (\`rank_id\`) REFERENCES \`permissions\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  ALTER TABLE \`users\` 
  ADD COLUMN \`extra_rank\` tinyint(4) NULL,
  ADD COLUMN \`user_of_the_week\` tinyint(4) NULL DEFAULT 0 AFTER \`extra_rank\`,
  ADD COLUMN \`client_type\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'nitro' AFTER \`user_of_the_week\`,
  ADD COLUMN \`stripe_customer_id\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER \`client_type\`,
  ADD COLUMN \`youtube_video\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'Bogh6KfGW2I' AFTER \`stripe_customer_id\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
  
  ALTER TABLE \`permissions\` 
  ADD COLUMN \`website_admin_client\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0',
  ADD COLUMN \`website_show_staff\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_admin_client\`,
  ADD COLUMN \`website_show_admin_panel\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_show_staff\`,
  ADD COLUMN \`website_manage_news\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_show_admin_panel\`,
  ADD COLUMN \`website_manage_ranks\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_news\`,
  ADD COLUMN \`website_manage_users\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_ranks\`,
  ADD COLUMN \`website_manage_beta_codes\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_users\`,
  ADD COLUMN \`website_manage_comments\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_beta_codes\`,
  ADD COLUMN \`website_manage_forums\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_comments\`,
  ADD COLUMN \`website_manage_guestbook\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_forums\`,
  ADD COLUMN \`website_manage_config\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_guestbook\`,
  ADD COLUMN \`website_manage_emulator\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_config\`,
  ADD COLUMN \`website_manage_bans\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_emulator\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
  
  ALTER TABLE \`users\` 
  DROP COLUMN \`mail_verified\`,
  ADD COLUMN \`mail_verified\` int(11) NOT NULL DEFAULT 0 AFTER \`mail\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
  
  DROP TABLE IF EXISTS \`instinct_guestbook\`;
  CREATE TABLE \`instinct_guestbook\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`profile_id\` int(11) DEFAULT NULL,
    \`author_id\` int(11) DEFAULT NULL,
    \`content\` text DEFAULT NULL,
    \`timestamp\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  SET FOREIGN_KEY_CHECKS = 1;
`;
