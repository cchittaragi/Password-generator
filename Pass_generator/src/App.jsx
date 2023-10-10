import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    // number is true add num in str
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
    // char is true add char in str

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      // for loop first 1 rinda start madathad upto lenght varege find madatada henga andr interface nalli navu range antha set madyada adara prakar adu set aaguta step1. adu i=1 adaga adu condition check madatada lenght kinta sanna ada ella antha edra char olag hogi random number togonadu barathada a random number en madathada adu char ada index value enda bandantha answer togondu pass olaga store madathad yavag lenght kintha meli hodaga adu loop break aagutha avaga pass nalli eru yall value horag kalasathad.


    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword]) //its callback is used for optimazation perpose  // if we give in the password it it wiil move to infinte loop thats way we use setpasswoed here if not given setpassword also fine no problems

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // above line is used for selecting password like color one password showing perpose it is used 
    passwordRef.current?.setSelectionRange(0, 999); // this is used for has mentioned 0 t0 999 value upto outer color will show
    window.navigator.clipboard.writeText(password)// it is used for copying password form the input box
  }, [password])// dependence it is not nesseary if  u want you can otherwise don't

  useEffect(() => {
    // its going first run in programm &  its is used renderning purpose
    //it has 2 type of inputs function & dependence the dependence is if we change the any lenght ,number , char it automatically render the page without notice
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3 text-3xl'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
              //even we can use setcharallowed(true) but there are some limitations about this is if we mentioned true means it will be always true not changing but even in checkbox cshowing check working but value are not working that way we use funcation in that if value is true again its going go change its value by "!" value 
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>

  )
}

export default App