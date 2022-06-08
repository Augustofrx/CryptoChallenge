
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
  } else if (window.innerWidth >= 1366){
    window.scrollTo({
      top: 650,
      left: 0,
      behavior: "smooth",
    })
  }
  }

  export const handleScrollSkills = () => {
    window.scrollTo({
      top: 1400,
      left: 0,
      behavior: "smooth",
    })
  }

  export const handleScrollProyects = () => {
    window.scrollTo({
      top: 2000,
      left: 0,
      behavior: "smooth",
  })
  }

  export const handleScrollContact = () => {
    window.scrollTo({
      top: 2700,
      left: 0,
      behavior: "smooth",
  })
}