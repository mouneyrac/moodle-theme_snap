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

                // if (action == "remove") {
                //     $(".menu_mycategory[data-categoryid="+categoryid+"]").css('color', '#b1f9ff');
                // } else if (action == "add") {
                //     $(".menu_mycategory[data-categoryid="+categoryid+"]").css('color', 'white');
                // }

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
                                $('.editcat').click();
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

                            // if not empty then hide all the courses not in the currently selected categories + show
                        },
                        fail: function(response) {
                            console.log('Change category ajax error');
                            notification.exception(response);
                        }
                    }
                ], true, true);
            };

            var dropdown = '<div style="display:inline" class="dropdown" >' +
                '<button style="border:0px" class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" aria-labelledby="coursesorting">' +
                'filter' +
                '<span class="caret"></span>' +
               '</button>' +
                '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">' +
                '<li><a href="#">All courses</a></li>' +
                '<li><a href="#">Favorites</a></li>' +
            '<li class="dropdown-submenu"><a href="#">Categories</a></li>' +
            '<li role="separator" class="divider"></li>' +
                '<li><a href="#">Teacher | A-Z</a></li>' +
            '</ul>' +
            '</div>';


            var h2 = $('section#fixy-my-courses div h2');

            // Add a down arrow at the end of the course title.

            $('.menu_mycategory_li').click(
                function() {
                    console.log($(this).css('color'));
                    var selectmenuoption = $(this).find( '.menu_mycategory' );
                    if (selectmenuoption.css('color') == 'rgb(255, 255, 255)') {
                        console.log('removing');
                        selectmenuoption.css('color', '#b1f9ff');
                        doAjax('remove', selectmenuoption.attr('data-categoryid'));
                    } else {
                        selectmenuoption.css('color', 'white');
                        console.log(selectmenuoption.attr('data-categoryid'));
                        doAjax('add', selectmenuoption.attr('data-categoryid'));
                    }

                }
            );

            // h2.append('<small style="cursor:pointer;margin-left: 6px">sorting</small>');
            h2.text('All courses');
            $("input:radio[id='option1']").change(
                function(){
                    if ($(this).is(':checked')) {
                        h2.text('All Courses');
                        $('.editcat').css('visibility', 'hidden');
                        $("[data-courseid='2']").css('display', 'none');
                        $("[data-courseid='3']").css('display', 'inline-block');
                        $("[data-courseid='4']").css('display', 'inline-block');
                        $("[data-courseid='5']").css('display', 'inline-block');
                        $("[data-courseid='6']").css('display', 'inline-block');
                        $("[data-courseid='7']").css('display', 'inline-block');
                        $("[data-courseid='8']").css('display', 'inline-block');
                        $("[data-courseid='9']").css('display', 'inline-block');
                    }
                    });

            $('#leftsidepanel').css('transition', 'width 0.1s');
            $('#catbutton').css('transition', 'position 0.1s, top 0.1s, left 0.1s, margin 0.1s, height 0.1s, width 0.1s');
            $('#allcoursesbutton').css('transition', 'opacity 0.05s ease');
            $('#azbutton').css('transition', 'opacity 0.05s ease');
            $('#catbutton .svg-icon').css('transition', 'opacity 0.1s ease');

            var menuopen = false;

            $("input:radio[id='option2']").change(
                function(){
                    if ($(this).is(':checked')) {

                        doAjax('listing');

                        $('.editcat').css('visibility', 'visible');
                    }
                    });


        }

        return new PersonalCourseMenu();

    }
);