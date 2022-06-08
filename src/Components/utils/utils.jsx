
  export const handleScrollHome = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
  }

  export const handleScrollAbout = () => {
  if(window.innerWidth <= 450) {
    window.scrollTo({
      top: 720,
      left: 0,
      behavior: "smooth",
    })
  } else {
    window.scrollTo({
      top: 586,
      left: 0,
      behavior: "smooth",
    })
  }
  }

  export const handleScrollSkills = () => {
    window.scrollTo({
      top: 1194,
      left: 0,
      behavior: "smooth",
    })
  }

  export const handleScrollProyects = () => {
    window.scrollTo({
      top: 1796,
      left: 0,
      behavior: "smooth",
  })
  }

  export const handleScrollContact = () => {
    window.scrollTo({
      top: 2538,
      left: 0,
      behavior: "smooth",
  })
}