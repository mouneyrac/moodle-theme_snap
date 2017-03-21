/**
 * This file is part of Moodle - http://moodle.org/
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   theme_snap
 * @copyright Copyright (c) 2017 University of Portland
 * @author Jerome Mouneyrac - jerome@mouneyrac.com
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Category filter of the personal menu.
 */
define(['jquery', 'core/log', 'core/ajax', 'core/notification'],
    function($, log, ajax, notification) {

        /**
         * Personal Menu (courses menu).
         * @constructor
         */
        var CategoryFilter = function() {

            var doAjax = function(action, categoryid) {
                ajax.call([
                    {
                        methodname: 'theme_snap_user_categories',
                        args: {userid: 2, action: action, categoryid: categoryid},
                        done: function(response) {
                            // hide all courses
                            $(".courseinfo").css('display', 'none');
                            $(".menu_mycategory").removeClass('menu_mycategory_selected');

                            var categoriestitle = 'Categories: ';
                            var categories = JSON.parse(response.listing);
                            if (categories.length == 0) {
                                // and open category selector
                               if($('.site-overlay').css('display') == 'none') {
                                   $('.editcat').click();
                               }
                            } else {
                                // only display the selected categories
                                var firstcategory = true;
                                categories.forEach(
                                    function(item, index) {
                                        $("[data-categoryid="+item+"]").css('display', 'inline');
                                        $(".menu_mycategory[data-categoryid="+item+"]").addClass('menu_mycategory_selected');
                                        $("#menu_mycategory_li_"+item).attr('aria-checked', 'true');
                                        // Add the category name to the menu categories title.
                                        if (!firstcategory) {
                                            categoriestitle = categoriestitle + ', ';
                                        } else {
                                            firstcategory = false;
                                        }
                                        var categorymenuoption = '#menu_mycategory_'+item;
                                        categoriestitle = categoriestitle + $(categorymenuoption).text();
                                    }
                                );
                            }
                            h2.text(categoriestitle);

                            $('.editcat').css('visibility', 'visible');


                            // if not empty then hide all the courses not in the currently selected categories + show
                        },
                        fail: function(response) {
                            notification.exception(response);
                        }
                    }
                ], true, true);
            };

            var h2 = $('section#fixy-my-courses div h2');

            var menu_mycategory_li_callback = function(element) {
                var selectmenuoption = element.find( '.menu_mycategory' );
                if (selectmenuoption.hasClass('menu_mycategory_selected')) {
                    element.attr('aria-checked', false);
                    selectmenuoption.removeClass('menu_mycategory_selected');
                    doAjax('remove', selectmenuoption.attr('data-categoryid'));
                } else {
                    element.attr('aria-checked', true);
                    selectmenuoption.addClass('menu_mycategory_selected');
                    doAjax('add', selectmenuoption.attr('data-categoryid'));
                }
            };

            var menu_mycategory_li_callback_this = function() {
                menu_mycategory_li_callback($(this));
            }


            $('.menu_mycategory_li').click(
                menu_mycategory_li_callback_this
            );

            $(".menu_mycategory_li").keypress(function() {
                if (event.which == 13 || event.which == 32) menu_mycategory_li_callback($(this));
            });

            h2.text('All courses');
            var allcourses_callback = function(){

                h2.text('All Courses');
                $('.editcat').css('visibility', 'hidden');

                $(".courseinfo").css('display', 'inline-block');

                $(".catfilter").css('display', 'inline');
                $(".allcourses").css('display', 'none');
            };
            $(".allcourses").click(
                allcourses_callback
            );
            $(".allcourses").keypress(function() {
                if (event.which == 13 || event.which == 32) allcourses_callback();
            });

            var catfilter_callback = function(){
                h2.text('Categories: ');

                doAjax('listing');

                $(".catfilter").css('display', 'none');
                $(".allcourses").css('display', 'inline');
            };

            $(".catfilter").click(catfilter_callback);

            $(".catfilter").keypress(function() {
                if (event.which == 13 || event.which == 32) catfilter_callback();
            });


            var editcat_callback = function(){
                // set the button as expanded.
                if($(".editcat").attr('aria-expanded') == 'true') {
                    $(".editcat").attr('aria-expanded', 'false');
                } else {
                    $(".editcat").attr('aria-expanded', 'true');
                }
            };
            $(".editcat").click(editcat_callback);
            $(".editcat").keypress(function() {
                //somehow do not need to use keypress as keypress on the pushy button triggers a click! Must be inside pushy code.
                //if (event.which == 13 || event.which == 32) editcat_callback();
            });

            $(".editcat").keydown(function() {

                // Do not exit the change category menu if menu is expanded.
                if (event.which == 9) {
                    if($(".editcat").attr('aria-expanded') == 'true') {
                        $('.pushy-content').focus();
                    }
                }
            });

            $("body").keydown(function() {
                if (event.which == 27) {
                    if($(".editcat").attr('aria-expanded') == 'true') {
                        $(".editcat").attr('aria-expanded', 'false')
                    }
                };
            });

            $(".site-overlay").click(
                function() {
                    $(".editcat").attr('aria-expanded', 'false')
                }
            );

            // Close off-canvas menu when pressing on the button.
            $(".pushy-close-icon").click(
                function() {
                    $('.site-overlay').click();
                }
            );


        }

        return new CategoryFilter();

    }
);