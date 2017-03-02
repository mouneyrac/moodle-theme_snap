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


            var doAjax = function() {
                console.log('Call change_category ajax.');
                ajax.call([
                    {
                        methodname: 'theme_snap_change_category',
                        args: {userid: 2, categoryid: 2, add: 1},
                        done: function(response) {
                            console.log('Change category ajax answer:');
                            console.log(response);
                        },
                        fail: function(response) {
                            console.log('Change category ajax error');
                            notification.exception(response);
                        }
                    }
                ], true, true);
            };

            doAjax();

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
            // h2.append(dropdown);


            // var menuhtml = '<div class="snapcoursesortingmenu" style="display: none;position: absolute;margin-top: 30px;' +
            //     'z-index: 100;background-color: white;min-width: 150px;padding: 16px;border: 1px;box-shadow: 4px 3px 5px 0px rgba(125,125,125,0.45)">' +
            //     '<small style="cursor:pointer;margin-left: 6px">' +
            //     'All courses<br/><br/>' +
            //     'Favorites<br/><br/>' +
            //     'Categories<br/><br/>' +
            //     '----------<br/><br/>' +
            //     'Teacher | A-Z' +
            //         '</small>' +
            //     '</div>';


            // $('#menu_allcourses').click(function() {
            //     $('#dropdownMenu1').text('All courses');
            //     $('#dropdownMenu1').append('<span class="caret"></span>');
            //     $("[data-courseid='2']").css('display', 'inline-block');
            //     $("[data-courseid='3']").css('display', 'inline-block');
            //     $("[data-courseid='4']").css('display', 'inline-block');
            //     $("[data-courseid='5']").css('display', 'inline-block');
            //     $("[data-courseid='6']").css('display', 'inline-block');
            //     $("[data-courseid='7']").css('display', 'inline-block');
            //     $("[data-courseid='8']").css('display', 'inline-block');
            //     $("[data-courseid='9']").css('display', 'inline-block');
            // });
            // $('#menu_favorites').click(function() {
            //     $('#dropdownMenu1').text('Favorites');
            //     $('#dropdownMenu1').append('<span class="caret"></span>');
            //     $("[data-courseid='3']").css('display', 'inline-block');
            //     $("[data-courseid='4']").css('display', 'inline-block');
            //     $("[data-courseid='2']").css('display', 'none');
            //     $("[data-courseid='5']").css('display', 'none');
            //     $("[data-courseid='6']").css('display', 'none');
            //     $("[data-courseid='7']").css('display', 'none');
            //     $("[data-courseid='8']").css('display', 'none');
            //     $("[data-courseid='9']").css('display', 'none');
            // });
            // $('#btnGroupVerticalDrop1').click(function() {
            //     $('#dropdownMenu1').text('Category: Physics');
            //     $('#dropdownMenu1').append('<span class="caret"></span>');
            //     $("[data-courseid='2']").css('display', 'none');
            //     $("[data-courseid='3']").css('display', 'inline-block');
            //     $("[data-courseid='4']").css('display', 'none');
            //     $("[data-courseid='5']").css('display', 'none');
            //     $("[data-courseid='6']").css('display', 'none');
            //     $("[data-courseid='7']").css('display', 'inline-block');
            //     $("[data-courseid='8']").css('display', 'inline-block');
            //     $("[data-courseid='9']").css('display', 'none');
            // });

            // Add a down arrow at the end of the course title.

            $('.menu_mycategory_li').click(
                function() {
                    console.log($(this).css('color'));
                    if ($(this).find( '.menu_mycategory' ).css('color') == 'rgb(255, 255, 255)') {
                        $(this).find( '.menu_mycategory' ).css('color', '#b1f9ff');
                    } else {
                        $(this).find( '.menu_mycategory' ).css('color', 'white');
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
            // $('.editcat').click(function(e) {
            //     e.stopPropagation();
            //     //$('#myModal').modal('show');
            //
            //
            //     if (menuopen) {
            //
            //         $('#leftsidepanel').css('width', '7%');
            //         $('#fixy-my-courses').css('width', '68%');
            //
            //         $('#catbutton .svg-icon').css('visibility', 'visible');
            //         $('#catbutton').css('position', 'inherit');
            //         $('#catbutton').css('top', 'inherit');
            //         $('#catbutton').css('left', 'inherit');
            //         $('#catbutton').css('margin', '20px');
            //         $('#catbutton').css('height', '60px');
            //         $('#catbutton').css('width', '60px');
            //
            //
            //         $('#allcoursesbutton').css('visibility', 'visible');
            //         $('#azbutton').css('visibility', 'visible');
            //
            //
            //
            //         menuopen = false;
            //     } else {
            //
            //         $('#fixy-my-courses').css('width', '65%');
            //         $('#leftsidepanel').css('width', '10%');
            //
            //
            //         $('#allcoursesbutton').css('visibility', 'hidden');
            //         $('#azbutton').css('visibility', 'hidden');
            //
            //         $('#catbutton .svg-icon').css('visibility', 'hidden');
            //
            //         $('#catbutton').css('position', 'absolute');
            //         $('#catbutton').css('top', '0');
            //         $('#catbutton').css('left', '0');
            //         $('#catbutton').css('margin', '0');
            //         $('#catbutton').css('margin-right', '20px');
            //         $('#catbutton').css('height', '800px');
            //         $('#catbutton').css('width', '100%');
            //
            //         menuopen = true;
            //     }
            //
            //     // Velocity(document.querySelectorAll('#catbutton'),
            //     //     { left: "100px" }
            //     //     , 100);
            // });



            $("input:radio[id='option2']").change(
                function(){
                    if ($(this).is(':checked')) {
                        h2.text('Category: Physics');
                        $('.editcat').css('visibility', 'visible');
                        $("[data-courseid='2']").css('display', 'none');
                        $("[data-courseid='3']").css('display', 'inline-block');
                        $("[data-courseid='4']").css('display', 'none');
                        $("[data-courseid='5']").css('display', 'none');
                        $("[data-courseid='6']").css('display', 'none');
                        $("[data-courseid='7']").css('display', 'inline-block');
                        $("[data-courseid='8']").css('display', 'inline-block');
                        $("[data-courseid='9']").css('display', 'none');

                    }
                    });


        }

        return new PersonalCourseMenu();

    }
);