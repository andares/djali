// deno fmt src/act/**/*.ts

import Controller from "./Controller.ts"
import Action from "./Action.ts"

export function act(name?: string): Action {
  !name && (name = "_default")
  let action = new Action(name)

  action.option('h', undefined, "Get help", ($value, $action) => {
    return false;
  });

  Controller.instance.attach(action)
  return action
}

act("help").config('intro', {
  head: `Run Emacs, the extensible, customizable, self-documenting real-time
display editor.  The recommended way to start Emacs for normal editing
is with no options at all.`,
  tail: `You can generally also specify long option names with a single -; for
example, -batch as well as --batch.  You can use any unambiguous
abbreviation for a --option.

Various environment variables and window system resources also affect
the operation of Emacs.  See the main documentation.

Report bugs to bug-gnu-emacs@gnu.org.  First, please see the Bugs
section of the Emacs manual or the file BUGS.`,
}).main((params, controller?: Controller) => {
  console.log(params)
})

act("help")

/*

Run Emacs, the extensible, customizable, self-documenting real-time
display editor.  The recommended way to start Emacs for normal editing
is with no options at all.

Run M-x info RET m emacs RET m emacs invocation RET inside Emacs to
read the main documentation for these command-line arguments.

Usage: emacs [OPTION-OR-FILENAME]...

Initialization options:

--batch                     do not do interactive display; implies -q
--chdir DIR                 change to directory DIR
--daemon, --bg-daemon[=NAME] start a (named) server in the background
--fg-daemon[=NAME]          start a (named) server in the foreground
--debug-init                enable Emacs Lisp debugger for init file
--display, -d DISPLAY       use X server DISPLAY
--module-assertions         assert behavior of dynamic modules
--no-build-details          do not add build details such as time stamps
--no-desktop                do not load a saved desktop
--no - init - file, -q          load neither ~/.emacs nor default.el

--color, --color=MODE           override color mode for character terminals;
                                  MODE defaults to `auto', and
                                  can also be `never', `always',
                                  or a mode name like `ansi8'
--cursor-color, -cr COLOR       color of the Emacs cursor indicating point
--font, -fn FONT                default font; must be fixed-width
--foreground-color, -fg COLOR   window foreground color
--fullheight, -fh               make the first frame high as the screen
--fullscreen, -fs               make the first frame fullscreen
--fullwidth, -fw                make the first frame wide as the screen
--maximized, -mm                make the first frame maximized
--geometry, -g GEOMETRY         window geometry
--no-bitmap-icon, -nbi          do not use picture of gnu for Emacs icon
--iconic                        start Emacs in iconified state
--internal-border, -ib WIDTH    width between text and main border
--line-spacing, -lsp PIXELS     additional space to put between lines
--mouse-color, -ms COLOR        mouse cursor color in Emacs window
--name NAME                     title for initial Emacs frame
--no-blinking-cursor, -nbc      disable blinking cursor
--reverse-video, -r, -rv        switch foreground and background
--title, -T TITLE               title for initial Emacs frame
--vertical-scroll-bars, -vb     enable vertical scroll bars
--xrm XRESOURCES                set additional X resources
--parent-id XID                 set parent window
--help                          display this help and exit
--version                       output version information and exit

You can generally also specify long option names with a single -; for
example, -batch as well as --batch.  You can use any unambiguous
abbreviation for a --option.

Various environment variables and window system resources also affect
the operation of Emacs.  See the main documentation.

Report bugs to bug-gnu-emacs@gnu.org.  First, please see the Bugs
section of the Emacs manual or the file BUGS.
*/