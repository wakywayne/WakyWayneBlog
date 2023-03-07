---
title: 'How to fix an element onClick event being triggered when a child is clicked'
date: 'September, 1, 2022'
excerpt: 'If you are struggling with nested elements onClick events this is your solution'
cover_image: '/images/posts/img7.jpg'
category: 'ClientSide'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# e.stopPropagation();
> e.stopPropagation() Stops the passing down of onClick events of parent elements being triggered by children elements so you can keep them separate here is an example below 

```html
 <li style={{ cursor: "pointer" }} onClick={(e) => { setEventSolutions(!eventSolutions); setEventSolutionsBracketing(false); setEventSolutionsWarZone(false); setEducation(false) }}>
<!-- Without the e.stopPropagation(); the above onClick event will trigger every time and mess up the functionality -->

              {/* <Link href='/'> */}
              <a>Event Solutions</a><AiFillCaretDown />
              {/* </Link> */}

              <Dropdown toggleState={eventSolutions}>

                <li>
                  <a href='https://find.wrestlingtournaments.com/well-run-tournaments'>
                    Well Run Tournaments
                  </a>
                </li>

                <li onClick={(e) => { e.stopPropagation(); setEventSolutionsBracketing(!eventSolutionsBracketing) }}>
<!-- The above e.stopPropagation stops the previously mentioned onClick from being triggered-->
                  <a>Rapid Brackets</a><AiFillCaretDown />
                  <DropdownSub toggleState={eventSolutionsBracketing}>
                    <li>
                      <a href='https://find.wrestlingtournaments.com/rapid-brackets-parents/'>User Info</a>
                    </li>
                    <li>
                      <a href='https://find.wrestlingtournaments.com/wrestling-brackets-fast-simple'>Tournament Director Info</a>
                    </li>
                  </DropdownSub>
                </li>

                <li onClick={(e) => { e.stopPropagation(); setEventSolutionsWarZone(!eventSolutionsWarZone); }}>
                  <a>WAR Zone</a><AiFillCaretDown />
                  <DropdownSub toggleState={eventSolutionsWarZone}>
                    <li>
                      <a href='https://find.wrestlingtournaments.com/parents'>User Info</a>
                    </li>
                    <li>
                      <a href='https://find.wrestlingtournaments.com/tournament-director'>Tournament Director Info</a>
                    </li>
                  </DropdownSub>
                </li>
              </Dropdown>
            </li>
```
