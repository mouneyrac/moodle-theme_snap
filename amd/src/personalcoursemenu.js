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
 * Personal course menu.
 */
define(['jquery', 'core/log', 'core/ajax', 'core/notification'],
    function($, log, ajax, notification) {

        /**
         * Personal Menu (courses menu).
         * @constructor
         */
        var PersonalCourseMenu = function() {

            var doAjax = function(action, categoryid) {

                console.log('Call change_category ajax.');
                ajax.call([
                    {
                        methodname: 'theme_snap_user_categories',
                        args: {userid: 2, action: action, categoryid: categoryid},
                        done: function(response) {
                            console.log('Change category ajax answer:');
                            console.log(response);

                            // hide all courses
                            $(".courseinfo").css('display', 'none');
                            $(".menu_mycategory").css('color', '#b1f9ff');

                            var categoriestitle = 'Categories: ';
                            var categories = JSON.parse(response.listing);
                            if (categories.length == 0) {
                                // and open category selector
                                console.log($('.site-overlay').css('display'));
                               if($('.site-overlay').css('display') == 'none') {
                                   $('.editcat').click();
                               }
                            } else {
                                // only display the selected categories
                                console.log(categories);
                                var firstcategory = true;
                                categories.forEach(
                                    function(item, index) {
                                        $("[data-categoryid="+item+"]").css('display', 'inline');
                                        $(".menu_mycategory[data-categoryid="+item+"]").css('color', 'white');
                                        // Add the category name to the menu categories title.
                                        if (!firstcategory) {
                                            categoriestitle = categoriestitle + ', ';
                                        } else {
                                            firstcategory = false;
                                        }
                                        var categorymenuoption = '#menu_mycategory_'+item;
                                        console.log($(categorymenuoption));
                                        categoriestitle = categoriestitle + $(categorymenuoption).text();
                                    }
                                );
                            }
                            h2.text(categoriestitle);

                            $('.editcat').css('visibility', 'visible');

                            // if not empty then hide all the courses not in the currently selected categories + show
                        },
                        fail: function(response) {
                            console.log('Change category ajax error');
                            notification.exception(response);
                        }
                    }
                ], true, true);
            };

            var h2 = $('section#fixy-my-courses div h2');

            var menu_mycategory_li_callback = function(element) {
                var selectmenuoption = element.find( '.menu_mycategory' );
                if (selectmenuoption.css('color') == 'rgb(255, 255, 255)') {
                    selectmenuoption.css('color', '#b1f9ff');
                    doAjax('remove', selectmenuoption.attr('data-categoryid'));
                } else {
                    selectmenuoption.css('color', 'white');
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
                var element = $(this);
                if (event.which == 13 || event.which == 32) menu_mycategory_li_callback(element);
            });

            // h2.append('<small style="cursor:pointer;margin-left: 6px">sorting</small>');
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

            $(".catfilter").click(
                catfilter_callback);

            $(".catfilter").keypress(function() {
                if (event.which == 13 || event.which == 32) catfilter_callback();
            });

        }

        return new PersonalCourseMenu();

    }
);