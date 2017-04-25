<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Services
 * @author    gthomas2
 * @copyright Copyright (c) 2016 Moodlerooms Inc. (http://www.moodlerooms.com)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$functions = [
    'theme_snap_course_card' => [
        'classname'     => 'theme_snap\\webservice\\ws_course_card',
        'methodname'    => 'service',
        'description'   => 'Course card renderable data',
        'type'          => 'read',
        'ajax'          => true,
        'loginrequired' => true
    ],
    'theme_snap_cover_image' => [
        'classname'     => 'theme_snap\\webservice\\ws_cover_image',
        'methodname'    => 'service',
        'description'   => 'Cover image modifier',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => true
    ],
    'theme_snap_user_categories' => [
        'classname'     => 'theme_snap\\webservice\\ws_user_categories',
        'methodname'    => 'user_categories',
        'description'   => 'add or remove a category from the user course menu - also can return listing of categories',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => true
    ],
    'theme_snap_user_viewing_mode' => [
        'classname'     => 'theme_snap\\webservice\\ws_user_categories',
        'methodname'    => 'user_viewing_mode',
        'description'   => 'get or set the user viewing mode',
        'type'          => 'write',
        'ajax'          => true,
        'loginrequired' => true
    ],
];

