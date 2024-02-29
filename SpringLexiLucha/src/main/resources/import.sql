
INSERT INTO shop_item (id, price, title) VALUES (-1, 0, "Default Text Color")
INSERT INTO shop_item (id, price, title) VALUES (-2, 0, "Default Border Color")
INSERT INTO shop_item (id, price, title) VALUES (-3, 0, "Default Background Color")
INSERT INTO shop_item (id, price, title) VALUES (-4, 0, "Default Background Image")

INSERT INTO text_color (id, color) VALUES (-1,"#000000")
INSERT INTO border_color (id, color) VALUES (-2,"#000000")
INSERT INTO background_color (id, color) VALUES (-3,"#ffffff")
INSERT INTO background_image (id, url) VALUES (-4,"")


-- Then the custom board itself
INSERT INTO custom_board (id, text_color_id, border_color_id, background_color_id,background_image_id) VALUES (-1,-1,-2,-3,-4)