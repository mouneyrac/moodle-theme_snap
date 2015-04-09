/**
 * NOTE: you can make this work on a fluid width element (i.e. responsively) if you call it on window resize.
 * jquery ellipsis plugin
 * author: Guy Thomas
 * date: 2014-10-16
 * (c) Moodle Rooms 2014-10-16
 * @returns {$.fn}
 */
$.fn.ellipsis = function() {

    if (!this[0]) {
        return;
    }

    /**
     * Is the last visual character in a string an html entity? If so return the entity else return false
     * @param str
     * @returns {bool | string}
     */
    var lastcharentity = function(str) {
        var re = /&(\#\d+|\#x[A-F0-9]+|[a-zA-Z]+);$/;
        var lastindex = 0;
        while ((match = re.exec(str)) !== null) {
            if (match.index == lastindex) {
                break;
            }
            lastindex = match.index + match[0].length;
            if (lastindex == str.length) {
                return match[0];
            }
        }
        return false;
    }

    /**
     * Get the character entity starting from a specific offset.
     * @param str
     *
     * @returns {bool | string}
     */
    var charentity = function(str, offset) {
        var re = /&(\#\d+|\#x[A-F0-9]+|[a-zA-Z]+);/g;
        var lastindex = 0;
        while ((match = re.exec(str)) !== null) {
            if (match.index == lastindex) {
                break;
            }
            lastindex = match.index + match[0].length;
            if (match.index == offset) {
                return match[0];
            }
            return false;
        }
    }

    /**
     * Shrink string by one character or entity
     *
     * @param str
     * @return string
     */
    var shrinkstring = function(str) {
        // We need to grab the entire length of a html entity if its the last component of the string and
        // use it as a decrementer.
        // otherwise we will get a bug where we trim a portion of a html entity away - e.g. &amp; to &amp and then
        // chrome will just automatically 'fix' the broken entity
        var lastcharentitiy = lastcharentity(str);
        var decrementer = 1;
        if (lastcharentitiy) {
            decrementer = lastcharentitiy.length;
        }
        return (str.substr(0, str.length - decrementer));
    }

    /**
     * Expand a string by one character or entity by comparing it to its original string
     *
     * @param str
     * @param originalstr
     * @return string
     */
    var expandstring = function(str, originalstr) {
        var nextchar = originalstr.substr(str.length, 1);
        if (nextchar == '&') {
            // The next char could be an entity
            var entity = charentity(originalstr, str.length);
            if (entity) {
                // OK, it is an entity so lets add it to str
                return str+entity;
            } else {
                // Looks like its just an unescaped ampersand
                return str + '&';
            }
        }
        return (str + nextchar);
    }

    this.each(function() {
        // log original text
        if (typeof($(this).data('originaltxt')) == 'undefined') {
            $(this).data('originaltxt', this.innerHTML);
        }

        // log text line height
        if (typeof($(this).data('emheight')) == 'undefined') {
            if ($(this).height() == 0) {
                // I am hidden
                return;
            }
            this.innerHTML = 'M';
            // Horrible bodge fix here, I'm adding 2 pixels on because its obviously not calculating the row height
            // correctly, or possibly my logic for working out ellipses is bad.
            $(this).data('emheight', $(this).height() + 2);
            this.innerHTML = $(this).data('originaltxt');
        }

        var emheight = parseInt($(this).data('emheight'));

        var maxrows = $(this).data('maxrows');

        // Note - this is in here temporarilly - we need to make it so you can pass max rows into the function.
        maxrows = !maxrows ? 2 : maxrows;

        var maxheight = $(this).data('maxheight');
        if (!maxheight && !maxrows){
            return this;
        } else if (!maxheight && maxrows){
            maxheight = maxrows * emheight;
        }

        if ($(this).height() > maxheight) {

            $(this).addClass('ellipsis_toobig');
            // Content is too big, lets shrink it (but never let it go less than 1 row height as that's pointless).
            var l = 0;
            while ($(this).height() > maxheight && $(this).height() > emheight) {
                l++;
                if (l > 1000) {
                    console.log('possible infinite loop when shrinking "'+$(this).data('originaltxt')+'"');
                    break;
                }
                this.innerHTML = shrinkstring(this.innerHTML);
                if (this.innerHTML.length < 2) {
                    // we've gone too far here!
                    return;
                }
            }

            if (this.innerHTML.length >= 2) {
                // Trim off one more character, just to be sure.
                this.innerHTML = shrinkstring(this.innerHTML);
            }

        } else {
            // OK, we might need to expand the string if it was previously ellipsed.
            // Note: This is only going to be called if the ellipses is redone on window resize.
            var l = 0;
            while ($(this).height() <= maxheight  && this.innerHTML.length < $(this).data('originaltxt').length) {
                l++;
                if (l > 1000) {
                    console.log('possible infinite loop when expanding "'+$(this).data('originaltxt')+'"');
                    break;
                }
                // Make content bigger.
                this.innerHTML = expandstring(this.innerHTML, $(this).data('originaltxt'));
            }
            // Take content back a notch
            if ($(this).height() > maxheight) {
                this.innerHTML = shrinkstring(this.innerHTML);
            } else {
                // Content fits now so get rid of ellipsis_toobig class
                $(this).removeClass('ellipsis_toobig');
            }
        }
    });

    /**
     * Test shrink and expand functions.
     * @TODO - at some point consider adding to a javascript unit testing framework like QUNIT.
     */
    function test_functions() {
        var teststrings = [
            "String test one - blah blah blah here we go and hope that this passes &amp;",
            "&amp; small string",
            "Large string with multiple entities &amp; and &nbsp; and &comma;",
            "&comma; start with entity",
            "end with entity &comma;",
            "entity in &comma; middle",
            "entity number &#160; in middle",
            "&#160; entity number at start",
            "entity number at end &#160;",
            "A test with a really really really long name and &amp; an entity &nbsp;"
        ];
        var tests = 0;
        var passes = 0;
        var fails = 0;

        for (var c=0; c<teststrings.length; c++){

            var originalstr = teststrings[c];
            console.log('Testing string', originalstr);
            str = originalstr;
            var totallen = str.length;

            // Shrink
            for (var a=0; a<totallen; a++) {
                str = shrinkstring(str);
                console.log('Shrunk string by '+a+' chars', str);
            }

            // Expand
            for (var a=0; a<totallen; a++) {
                str = expandstring(str, originalstr);
                console.log('Expanded string by '+a+' chars', str);
            }

            // Test back to normal
            tests++;
            if (str == originalstr) {
                console.log('Test passed for', originalstr);
                passes++;
            } else {
                console.log('Test failed for', originalstr);
                fails++;
            }
        }
        console.log(passes+' test passed and '+fails+' tests failed');
    }
    return this;
}