/**
 * Listens to mouse events within the window and document and holds the current
 * mouse state like position, buttons and whether or not the mouse is within the
 * browser window.
 *
 * @author BugSlayer
 */
 export default class MouseListener {
    /*
     * THESE ARE CONSTANTS THAT DEFINE THE DIFFERENT BUTTON STATES
     * For more information,
     * see: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
     */
  
    /**
     * No button or un-initialized
     */
    public static readonly BUTTON_NOTHING = 0;
  
    /**
     * Primary button (usually the left button)
     */
    public static readonly BUTTON_PRIMARY = 1;
  
    /**
     * Secondary button (usually the right button)
     */
    public static readonly BUTTON_SECONDARY = 2;
  
    /**
     * Auxiliary button (usually the mouse wheel button or middle button)
     */
    public static readonly BUTTON_AUXILIARY = 4;
  
    /**
     * 4th button (typically the "Browser Back" button)
     */
    public static readonly BUTTON_FOURTH = 8;
  
    /**
     * 5th button (typically the "Browser Forward" button)
     */
    public static readonly BUTTON_FIFTH = 16;
  
    /**
     * Holds property indicates which buttons are pressed on the mouse
     * (or other input device).
     */
    private buttonState: number;
  
    /**
     * True if the mouse is currently in the document window.
     */
    private inWindow: boolean;
  
    /**
     * Holds the current mouse X-position.
     */
    public positionX: number;
  
    /**
     * Holds the current mouse Y-position.
     */
    public positionY: number;
  
    /**
     * Construct an object of this class.
     */
    public constructor() {
      this.buttonState = MouseListener.BUTTON_NOTHING;
      this.positionX = 0;
      this.positionY = 0;
      this.inWindow = true;
  
      window.addEventListener('mousedown', this.mouseDown);
      window.addEventListener('mouseup', this.mouseUp);
      window.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseenter', this.mouseEnter);
      document.addEventListener('mouseleave', this.mouseLeave);
    }
  
    /**
     *
     * @returns the current X position
     */
    public getPositionX(): number {
      return this.positionX;
    }
  
    /**
     *
     * @returns the current Y position
     */
    public getPositionY(): number {
      return this.positionY;
    }
  
    /**
     *
     * @returns true if the mouse cursor is currently within the window
     */
    public isInWindow(): boolean {
      return this.inWindow;
    }
  
    /**
     *
     * @returns true if the primary button is pressed
     */
    public isPrimaryButtonPressed(): boolean {
      return this.isButtonPressed(MouseListener.BUTTON_PRIMARY);
    }
  
    /**
     *
     * @returns true if the secondary button is pressed
     */
    public isSecondaryButtonPressed(): boolean {
      return this.isButtonPressed(MouseListener.BUTTON_SECONDARY);
    }
  
    /**
     *
     * @returns true if the auxiliary button is pressed
     */
    public isAuxiliaryButtonPressed(): boolean {
      return this.isButtonPressed(MouseListener.BUTTON_AUXILIARY);
    }
  
    /**
     *
     * @returns true if the fourth button is pressed
     */
    public isFourthButtonPressed(): boolean {
      return this.isButtonPressed(MouseListener.BUTTON_FOURTH);
    }
  
    /**
     *
     * @returns true if the fifth button is pressed
     */
    public isFifthButtonPressed(): boolean {
      return this.isButtonPressed(MouseListener.BUTTON_FIFTH);
    }
  
    /*
     * Helper method that filters the button state to check if a specific button
     * is pressed
     * @param button the button filter to use
     * @returns true if the specified button is pressed
     */
    private isButtonPressed(button: number): boolean {
      // Must use bitwise and. So disable eslint just this once
      // trust me, I know what i'm doing :P
      // eslint-disable-next-line no-bitwise
      return (this.buttonState & button) !== 0;
    }
  
    /*
     * @internal Arrow method that handles mouseDown events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseDown = (ev: MouseEvent) => {
      this.buttonState = ev.buttons;
    };
  
    /*
     * @internal Arrow method that handles mouseUp events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseUp = (ev: MouseEvent) => {
      this.buttonState = ev.buttons;
    };
  
    /*
     * @internal Arrow method that handles mouseMove events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseMove = (ev: MouseEvent) => {
      this.positionX = ev.clientX;
      this.positionY = ev.clientY;
    };
  
    /*
     * @internal Arrow method that handles mouseEnter events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseEnter = () => {
      this.inWindow = true;
    };
  
    /*
     * @internal Arrow method that handles mouseLeave events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private mouseLeave = () => {
      this.inWindow = false;
    };
  }