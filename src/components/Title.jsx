function Title({text1,text2}) {
    return (
        <div className="text-2xl md:text-3xl flex items-center font-bold gap-1">
            <h1 className="text-gray-500">{text1}</h1>
            <h1 className="text-black">{text2}</h1>
        </div>
    )
}

export default Title
