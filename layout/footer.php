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
 * Layout - footer.
 * This layout is baed on a moodle site index.php file but has been adapted to show news items in a different
 * way.
 *
 * @package   theme_snap
 * @copyright Copyright (c) 2015 Moodlerooms Inc. (http://www.moodlerooms.com)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

$inccoursefooterclass = ($PAGE->theme->settings->coursefootertoggle && strpos($PAGE->pagetype, 'course-view-') === 0) ? ' hascoursefooter' : ' nocoursefooter';
?>
<footer id="moodle-footer" role="contentinfo" class="clearfix<?php echo ($inccoursefooterclass)?>">
<?php
/* snap custom footer */

/* custom footer edit button - always shown */
$footnote = empty($PAGE->theme->settings->footnote) ? '' : $PAGE->theme->settings->footnote;
if ($this->page->user_is_editing() && $PAGE->pagetype == 'site-index') {
    $url = new moodle_url('/admin/settings.php', ['section' => 'themesettingsnap'], 'admin-footnote');
    $link = html_writer::link($url, get_string('editcustomfooter', 'theme_snap'), ['class' => 'btn btn-inverse btn-sm']);
    $footnote .= '<p class="text-right">'.$link.'</p>';
}

/* custom menu edit button - only shown if menu exists */
$custommenu = $OUTPUT->custom_menu();
if (!empty($custommenu) && $this->page->user_is_editing() && $PAGE->pagetype == 'site-index') {
    $url = new moodle_url('/admin/settings.php', ['section' => 'themesettings'], 'id_s__custommenuitems');
    $link = html_writer::link($url, get_string('editcustommenu', 'theme_snap'), ['class' => 'btn btn-inverse btn-sm']);
    $custommenu .= '<p class="text-right">'.$link.'</p>';
}



if (!empty($custommenu) && !empty($footnote)) {
    echo '<div class="row">';
        echo '<div class="col-md-6">';
        echo $footnote;
        echo '</div>';
        echo '<div class="col-md-6">';
        echo $custommenu;
        echo '</div>';
    echo '</div>';
} else if (!empty($footnote)) {
    echo '<div class="row">
        <div class="col-md-12">';
    echo $footnote;
    echo '</div></div>';
} else if (!empty($custommenu)) {
    echo '<div class="row">
        <div class="col-md-12">';
    echo $custommenu;
    echo '</div></div>';
}

if (core_component::get_component_directory('local_mrooms') !== null) {
    $langkey   = \local_mrooms\kb_link::resolve_language_key();
    $builtwith = html_writer::link('https://redirects.blackboard.com/005_000'.$langkey, get_string('joule', 'theme_snap'),
        ['target' => '_blank', 'title' => get_string('joulehelpguides', 'theme_snap')]);
} else {
    $builtwith = get_string('joule', 'theme_snap');
}

$poweredbyrunby = get_string('poweredbyrunby', 'theme_snap', $builtwith);
?>

<div id='mrooms-footer' class="helplink text-right">
    <small>
    <?php
    if ($OUTPUT->page_doc_link()) {
        echo $OUTPUT->page_doc_link();
    }
    ?>
    <br/><?php echo $poweredbyrunby ?>
<br>© Copyright 2016 Moodlerooms Inc, All Rights Reserved.</small>
</div>
<!-- close mrooms footer -->
<div id="page-footer">
<?php echo $OUTPUT->lang_menu(); ?>
<?php echo $OUTPUT->standard_footer_html(); ?>
</div>
</footer>
<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Select categories</h4>
            </div>
            <div class="modal-body">
                <div class="btn-group" data-toggle="buttons">
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Alphabet
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Boat Design
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Course Design
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Dance
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Economy
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Football
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > GST
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Horticulture
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Information Technology
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Jar design
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Koala training
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Lamp Design
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off"> Mathematics
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Origami
                    </label>
                    <label style="margin:10px" class="btn btn-primary">
                        <input type="checkbox" autocomplete="off" > Rat labs
                    </label>
                    <label style="margin:10px" class="btn btn-primary active">
                        <input type="checkbox" autocomplete="off" checked> Physics
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<?php echo $OUTPUT->standard_end_of_body_html() ?>
<script src="http://moodles.bepaw.com/stable_30_snap_uop/theme/snap/pushy/js/pushy.min.js"></script>
<!-- bye! -->
</body>
</html>
