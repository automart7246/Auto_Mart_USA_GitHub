// Method to Remove Elements Found at https://stackoverflow.com/questions/4777077/removing-elements-by-class-name

//Remove All Tags for Showing the 'Adjusted MMR' Key-Value Pair Boxes
const mui_col_mui_col_2_5 = document.getElementsByClassName("mui-col mui-col--2-5");
console.log(mui_col_mui_col_2_5)
while (mui_col_mui_col_2_5.length > 0){mui_col_mui_col_2_5[0].remove();}

//Remove All Tags for Showing the 'Seller' Key-Value Pair Boxes
const mui_col_mui_col_1_1_mui_col_1_2_lg_clip_text = document.getElementsByClassName("mui-col mui-col--1-1 mui-col--1-2--lg clip-text");
console.log(mui_col_mui_col_1_1_mui_col_1_2_lg_clip_text)
while (mui_col_mui_col_1_1_mui_col_1_2_lg_clip_text.length > 0){mui_col_mui_col_1_1_mui_col_1_2_lg_clip_text[0].remove();}

//Remove All Tags for Showing the 'Starting Bid' Key-Value Pair Boxes
const cta_link__bid_container_bid_container = document.getElementsByClassName("CtaLink__bid-container bid-container");
console.log(cta_link__bid_container_bid_container)
while (cta_link__bid_container_bid_container > 0){cta_link__bid_container_bid_container[0].parentNode.removeChild(elements[0]);}

//Remove All Tags for Showing the 'Buy Now' Key-Value Pair Boxes
const cta_link__buy_now_container_buy_now_container = document.getElementsByClassName("CtaLink__buy-now-container buy-now-container");
console.log(cta_link__buy_now_container_buy_now_container)
while (cta_link__buy_now_container_buy_now_container > 0){cta_link__buy_now_container_buy_now_container[0].remove();}

//Remove All Tags for Showing the 'Make Offer' Boxes
const tracker_container_show_block_mui_m_h_tb_align_center_hide_if_empty = document.getElementsByClassName("Tracker__container show--block mui-m-h-tb align--center hide-if-empty");
console.log(tracker_container_show_block_mui_m_h_tb_align_center_hide_if_empty)
while (tracker_container_show_block_mui_m_h_tb_align_center_hide_if_empty > 0){tracker_container_show_block_mui_m_h_tb_align_center_hide_if_empty[0].remove();}