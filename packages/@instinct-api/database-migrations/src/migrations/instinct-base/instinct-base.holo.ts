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
  ADD COLUMN \`client_type\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'nitro',
  ADD COLUMN \`real_name\` varchar(255) NULL,
  ADD COLUMN \`user_of_the_week\` tinyint(4) NULL DEFAULT 0,
  ADD COLUMN \`account_day_of_birth\` int(11) NULL DEFAULT 0,
  ADD COLUMN \`stripe_customer_id\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL AFTER \`client_type\`,
  ADD COLUMN \`youtube_video\` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'Bogh6KfGW2I' AFTER \`stripe_customer_id\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
  
  ALTER TABLE \`ranks\` 
  ADD COLUMN \`level\` tinyint(4) NULL DEFAULT 0,
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
  ADD COLUMN \`website_create_business\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_bans\`,
  ADD COLUMN \`website_propose_laws\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_create_business\`,
  ADD COLUMN \`website_vote_on_laws\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_propose_laws\`,
  ADD COLUMN \`website_dismiss_laws\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_vote_on_laws\`,
  ADD COLUMN \`website_open_voting_on_laws\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_dismiss_laws\`,
  ADD COLUMN \`website_stop_voting_on_laws\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_open_voting_on_laws\`,
  ADD COLUMN \`website_manage_business\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_stop_voting_on_laws\`,
  ADD COLUMN \`website_register_political_party\` enum('0','1') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0' AFTER \`website_manage_business\`,
 
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
  
  DROP TABLE IF EXISTS \`user_badges\`;
  CREATE TABLE \`user_badges\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`user_id\` int(10) unsigned NOT NULL,
    \`badge_id\` varchar(100) NOT NULL,
    \`badge_slot\` int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`user_id\` (\`user_id\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
  
  
  DROP TABLE IF EXISTS \`guild_forum_views\`;
  CREATE TABLE \`guild_forum_views\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`user_id\` int(11) NOT NULL,
    \`guild_id\` int(11) NOT NULL,
    \`timestamp\` int(11) NOT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

  DROP TABLE IF EXISTS \`guilds\`;
  CREATE TABLE \`guilds\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`user_id\` int(11) NOT NULL DEFAULT 0,
    \`name\` varchar(50) NOT NULL DEFAULT '',
    \`description\` varchar(250) NOT NULL DEFAULT '',
    \`room_id\` int(11) NOT NULL DEFAULT 0,
    \`state\` int(3) NOT NULL DEFAULT 0,
    \`rights\` enum('0','1') NOT NULL DEFAULT '0',
    \`color_one\` int(11) NOT NULL DEFAULT 0,
    \`color_two\` int(11) NOT NULL DEFAULT 0,
    \`badge\` varchar(256) NOT NULL DEFAULT '',
    \`date_created\` int(11) NOT NULL,
    \`forum\` enum('0','1') NOT NULL DEFAULT '0',
    \`read_forum\` enum('EVERYONE','MEMBERS','ADMINS') NOT NULL DEFAULT 'EVERYONE',
    \`post_messages\` enum('EVERYONE','MEMBERS','ADMINS','OWNER') NOT NULL DEFAULT 'EVERYONE',
    \`post_threads\` enum('EVERYONE','MEMBERS','ADMINS','OWNER') NOT NULL DEFAULT 'EVERYONE',
    \`mod_forum\` enum('ADMINS','OWNER') NOT NULL DEFAULT 'ADMINS',
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`id\` (\`id\`) USING BTREE,
    KEY \`data\` (\`room_id\`,\`user_id\`) USING BTREE,
    KEY \`name\` (\`name\`) USING BTREE,
    KEY \`description\` (\`description\`) USING BTREE
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
  
  DROP TABLE IF EXISTS \`guilds_elements\`;
  CREATE TABLE \`guilds_elements\` (
    \`id\` int(11) NOT NULL,
    \`firstvalue\` varchar(300) NOT NULL,
    \`secondvalue\` varchar(300) NOT NULL,
    \`type\` varchar(50) NOT NULL,
    \`enabled\` enum('0','1') NOT NULL DEFAULT '1',
    UNIQUE KEY \`id\` (\`id\`,\`type\`) USING BTREE,
    UNIQUE KEY \`data\` (\`id\`,\`type\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
  
  DROP TABLE IF EXISTS \`guilds_forums_comments\`;
  CREATE TABLE \`guilds_forums_comments\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
    \`thread_id\` int(11) NOT NULL DEFAULT 0,
    \`user_id\` int(11) NOT NULL DEFAULT 0,
    \`message\` text COLLATE utf8mb4_bin NOT NULL,
    \`created_at\` int(11) NOT NULL DEFAULT 0,
    \`state\` int(11) NOT NULL DEFAULT 0,
    \`admin_id\` int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`id\` (\`id\`) USING BTREE,
    KEY \`thread_data\` (\`thread_id\`,\`user_id\`,\`created_at\`,\`state\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
  
  DROP TABLE IF EXISTS \`guilds_forums_threads\`;
  CREATE TABLE \`guilds_forums_threads\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
    \`guild_id\` int(11) DEFAULT 0,
    \`opener_id\` int(11) DEFAULT 0,
    \`subject\` varchar(255) COLLATE utf8mb4_bin DEFAULT '',
    \`posts_count\` int(11) DEFAULT 0,
    \`created_at\` int(11) DEFAULT 0,
    \`updated_at\` int(11) DEFAULT 0,
    \`state\` int(11) DEFAULT 0,
    \`pinned\` tinyint(4) DEFAULT 0,
    \`locked\` tinyint(4) DEFAULT 0,
    \`admin_id\` int(11) DEFAULT 0,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=COMPACT;
  
  DROP TABLE IF EXISTS \`guilds_members\`;
  CREATE TABLE \`guilds_members\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`guild_id\` int(11) NOT NULL DEFAULT 0,
    \`user_id\` int(11) NOT NULL DEFAULT 0,
    \`level_id\` int(3) NOT NULL DEFAULT 0,
    \`member_since\` int(11) NOT NULL DEFAULT 0,
    PRIMARY KEY (\`id\`) USING BTREE,
    KEY \`id\` (\`id\`) USING BTREE,
    KEY \`user_id\` (\`user_id\`) USING BTREE,
    KEY \`guild_id\` (\`guild_id\`) USING BTREE,
    KEY \`userdata\` (\`user_id\`,\`guild_id\`) USING BTREE,
    KEY \`level_id\` (\`level_id\`) USING BTREE,
    KEY \`member_since\` (\`member_since\`) USING BTREE
  ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
  
  DROP TABLE IF EXISTS \`instinct_guestbook\`;
  CREATE TABLE \`instinct_guestbook\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT,
    \`profile_id\` int(11) DEFAULT NULL,
    \`author_id\` int(11) DEFAULT NULL,
    \`content\` text DEFAULT NULL,
    \`timestamp\` int(11) DEFAULT NULL,
    PRIMARY KEY (\`id\`) USING BTREE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;ƒ
  
  
  ALTER TABLE \`rp_stats\` 
  ADD COLUMN \`political_party_id\` int(11) NULL DEFAULT NULL AFTER \`melee\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`) USING BTREE;
 
  
  ALTER TABLE \`rp_jobs_ranks\` 
  ADD COLUMN \`id\` int(0) NOT NULL AUTO_INCREMENT AFTER \`limit\`,
  ADD COLUMN \`government_branch\` varchar(255) NULL AFTER \`id\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`, \`job\`, \`rank\`) USING BTREE;
  
  ALTER TABLE\`rp_jobs\` 
  ADD COLUMN \`is_government\` boolean AFTER \`stop_time\`;
  

  ALTER TABLE \`rp_gangs_ranks\` 
  ADD COLUMN \`id\` int(0) NOT NULL AUTO_INCREMENT,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`, \`job\`, \`rank\`) USING BTREE;
   
  ALTER TABLE \`rp_gangs_ranks\` 
  ADD COLUMN \`id\` int(0) NOT NULL AUTO_INCREMENT AFTER \`limit\`,
  DROP PRIMARY KEY,
  ADD PRIMARY KEY (\`id\`, \`gang\`, \`rank\`) USING BTREE;
  
  
 
DROP TABLE IF EXISTS \`instinct_rp_guide_categories\`;
CREATE TABLE \`instinct_rp_guide_categories\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`color\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`instinct_rp_guide_reactions\`;
CREATE TABLE \`instinct_rp_guide_reactions\` (
  \`id\` int(255) NOT NULL AUTO_INCREMENT,
  \`guide_id\` int(11) DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`reaction\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_guides_reactions_user\` (\`user_id\`),
  KEY \`instinct_rp_guides_reaction_guide\` (\`guide_id\`),
  CONSTRAINT \`instinct_rp_guides_reaction_guide\` FOREIGN KEY (\`guide_id\`) REFERENCES \`instinct_rp_guide_reactions\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_rp_guides_reactions_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`instinct_rp_guides\`;
CREATE TABLE \`instinct_rp_guides\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`guide_categories_id\` int(11) DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`content\` text DEFAULT NULL,
  \`status\` varchar(255) DEFAULT NULL,
  \`created_at\` int(255) DEFAULT NULL,
  \`updated_at\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_guides_user\` (\`user_id\`),
  CONSTRAINT \`instinct_rp_guides_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`instinct_rp_laws\`;
CREATE TABLE \`instinct_rp_laws\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`content\` text DEFAULT NULL,
  \`created_at\` int(255) DEFAULT NULL,
  \`updated_at\` int(11) DEFAULT NULL,
  \`status\` varchar(255) DEFAULT NULL,
  \`enacted_at\` int(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_laws_user\` (\`user_id\`),
  CONSTRAINT \`instinct_rp_laws_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_laws_comments\`;
CREATE TABLE \`instinct_rp_laws_comments\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` int(11) DEFAULT NULL,
  \`law_id\` int(11) DEFAULT NULL,
  \`content\` text DEFAULT NULL,
  \`created_at\` int(255) DEFAULT NULL,
  \`updated_at\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`) USING BTREE,
  KEY \`instinct_rp_laws_comments_user\` (\`user_id\`),
  KEY \`instinct_rp_laws_comments_law\` (\`law_id\`),
  CONSTRAINT \`instinct_rp_laws_comments_law\` FOREIGN KEY (\`law_id\`) REFERENCES \`instinct_rp_laws\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_rp_laws_comments_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_laws_events\`;
CREATE TABLE \`instinct_rp_laws_events\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`law_id\` int(11) DEFAULT NULL,
  \`event\` text DEFAULT NULL,
  \`timestamp\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_laws_events_law\` (\`law_id\`),
  CONSTRAINT \`instinct_rp_laws_events_law\` FOREIGN KEY (\`law_id\`) REFERENCES \`instinct_rp_laws\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_laws_votes\`;
CREATE TABLE \`instinct_rp_laws_votes\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` int(11) DEFAULT NULL,
  \`law_id\` int(11) DEFAULT NULL,
  \`status\` enum('approved','rejected') DEFAULT NULL,
  \`created_at\` int(255) DEFAULT NULL,
  \`updated_at\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_laws_votes_law\` (\`law_id\`),
  KEY \`instinct_rp_laws_votes_user\` (\`user_id\`),
  CONSTRAINT \`instinct_rp_laws_votes_law\` FOREIGN KEY (\`law_id\`) REFERENCES \`instinct_rp_laws\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_rp_laws_votes_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_political_parties\`;
CREATE TABLE \`instinct_rp_political_parties\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) DEFAULT NULL,
  \`badge\` varchar(255) DEFAULT NULL,
  \`description\` varchar(255) DEFAULT NULL,
  \`about\` text DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`ideology\` varchar(255) DEFAULT NULL,
  \`created_at\` int(11) DEFAULT NULL,
  \`updated_at\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_rp_political_parties_user\` (\`user_id\`),
  CONSTRAINT \`instinct_rp_political_parties_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_political_parties_members\`;
CREATE TABLE \`instinct_rp_political_parties_members\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`political_party_id\` int(11) NOT NULL,
  \`is_admin\` tinyint(1) NOT NULL DEFAULT 0,
  \`user_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`,\`is_admin\`) USING BTREE,
  KEY \`instinct_rp_political_parties_members_user\` (\`user_id\`),
  KEY \`instinct_rp_political_parties_members_party\` (\`political_party_id\`),
  CONSTRAINT \`instinct_rp_political_parties_members_party\` FOREIGN KEY (\`political_party_id\`) REFERENCES \`instinct_rp_political_parties\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_rp_political_parties_members_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS \`instinct_rp_properties\`;
CREATE TABLE \`instinct_rp_properties\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`room_id\` int(11) DEFAULT NULL,
  \`user_id\` int(11) DEFAULT NULL,
  \`listing_price\` decimal(10,2) DEFAULT NULL,
  \`listed_at\` int(255) DEFAULT NULL,
  \`sold_at\` varchar(255) DEFAULT NULL,
  \`customer_id\` int(11) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_properties_user\` (\`user_id\`),
  CONSTRAINT \`instinct_properties_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`instinct_rp_properties_bids\`;
CREATE TABLE \`instinct_rp_properties_bids\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_id\` int(11) DEFAULT NULL,
  \`property_id\` int(11) DEFAULT NULL,
  \`offer\` int(255) DEFAULT NULL,
  \`created_at\` varchar(255) DEFAULT NULL,
  \`accepted\` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_properties_bids_property\` (\`property_id\`),
  KEY \`instinct_properties_bids_user\` (\`user_id\`),
  CONSTRAINT \`instinct_properties_bids_property\` FOREIGN KEY (\`property_id\`) REFERENCES \`instinct_rp_properties\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_properties_bids_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS \`instinct_rp_properties_photos\`;
CREATE TABLE \`instinct_rp_properties_photos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`property_id\` int(11) DEFAULT NULL,
  \`photo_id\` int(11) DEFAULT NULL,
  \`is_primary\` varchar(255) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`instinct_properties_photo_property\` (\`property_id\`),
  KEY \`instinct_properties_photo_photo\` (\`photo_id\`),
  CONSTRAINT \`instinct_properties_photo_photo\` FOREIGN KEY (\`photo_id\`) REFERENCES \`instinct_rp_properties_photos\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`instinct_properties_photo_property\` FOREIGN KEY (\`property_id\`) REFERENCES \`instinct_rp_properties\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
  
  SET FOREIGN_KEY_CHECKS = 1;
`;
