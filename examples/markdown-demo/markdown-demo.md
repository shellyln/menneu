
%%%(style (@ (dangerouslySetInnerHTML ".content { font-style: italic; color: red; }")))
%%%($now)
%%%(Greeting (@ (to "Menneu")) "Good morning!")


# Heading

# h1
## h2
### h3
#### h4
##### h5
###### h6

Alt-h1
======
Alt-h2
------



# Links
[I'm an inline-style link](https://shellyln.github.io)

[I'm an inline-style link with title](https://shellyln.github.io "shellyln")


# Images
![alt text](https://shellyln.github.io/assets/image/liyad-logo.svg "Logo" =300x100)
![alt text](https://shellyln.github.io/assets/image/redagate-logo.svg "Logo" =300x100)

%%%(Image (@ (src "https://shellyln.github.io/assets/image/liyad-logo.svg")
             (width 300) (height 100) (unit "px") (alt "Logo2") ))
%%%(Image (@ (src "https://shellyln.github.io/assets/image/redagate-logo.svg")
             (width 300) (height 100) (unit "px") (alt "Logo2") ))

# Custom container

::: spoiler Click me!
Alice was beginning to get very tired of sitting by her sister on the
bank, and of having nothing to do. Once or twice she had peeped into the
book her sister was reading, ...
:::

---

::: content
Alice was beginning to get very tired of sitting by her sister on the
bank, and of having nothing to do. Once or twice she had peeped into the
book her sister was reading, but it had no pictures or conversations in
it, %%%(b "\"and what is the use of a book,\"") thought Alice,
%%%(b "\"without pictures or conversations?\"")
:::

---

::: content
So she was considering in her own mind (as well as she could, for the
day made her feel very sleepy and stupid), whether the pleasure of
making a daisy-chain would be worth the trouble of getting up and
picking the daisies, when suddenly a %%%(b "White Rabbit") with pink eyes ran
close by her.
:::

---

::: content
There was nothing so %%%(b "very") remarkable in that, nor did Alice think it so
very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh
dear! I shall be too late!" But when the Rabbit actually took a watch
out of its waistcoat-pocket and looked at it and then hurried on, Alice
started to her feet, for it flashed across her mind that she had never
before seen a rabbit with either a waistcoat-pocket, or a watch to take
out of it, and, burning with curiosity, she ran across the field after
it and was just in time to see it pop down a large rabbit-hole, under
the hedge. In another moment, down went Alice after it!
:::



# highlighting

```js
function foo(x) {
    return x;
}
```

```html
<!DOCTYPE html>
<html lang="ja">
 <head>
  <meta charset="UTF-8">
  <link rel="author" href="mailto:mail@example.com">
  <title lang="en">HyperText Markup Language - Wikipedia</title>
 </head>
 <body>
  <article>
   <h1 lang="en">HyperText Markup Language</h1>
   <p>HTML</p>
  </article>
 </body>
</html>
```



# Barcodes and SVG

%%%(Svg (@ (width 100)
           (height 100)
           (unit "mm") )
    (Rect   (@  (x 5)
                (y 67)
                (width 70)
                (height 11)
                (stroke) ))
    (Qr     (@  (x 5)
                (y 7)
                (data "Hello") ))
    (Ean13  (@  (x 5)
                (y 37)
                (elementWidth 0.66)
                (height 15)
                (quietHeight 0)
                (textHeight 7)
                (font "7px 'OCRB'")
                (data "123456789012") )) )



# Lists

1. First ordered list item
2. Another item
    * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
4. And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

    To have a line break without a paragraph, you will need to use two trailing spaces.  
    Note that this line is separate, but within the same paragraph.  
    (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses



# Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

----



# Loop and logics

%%%($=for $data
    (div "hello," $data "," $index)
)



# Cheeckbox

[ ] foo
[X] bar
[ ] baz



# PlantUML

@startuml
Bob -> Alice : Hello
@enduml


%%%(PlantUml """
Alice -> Bob : Bonjour
""")


@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml


%%%(PlantUml """
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
""")


@startuml
(First usecase)
(Another usecase) as (UC2)  
usecase UC3
usecase (Last\\nusecase) as UC4

Alice -> Bob : Bonjour
Alice -> UC3 : Bonjour
@enduml


%%%(PlantUml """
(First usecase)
(Another usecase) as (UC2)  
usecase UC3
usecase (Last\\nusecase) as UC4

Alice -> Bob : Bonjour
Alice -> UC3 : Bonjour
""")


# Charts


%%%(Svg (@ (width 600)
           (height 600)
           (unit "px") )
    (Chart (@ (settings (#
        (type "bar")
        (data (#
            (labels ($list "Red" "Blue" "Yellow" "Green" "Purple" "Orange"))
            (datasets ($list (#
                (label "# of Votes")
                (data ($list 12 19 3 5 2 3))
                (backgroundColor ($list
                    "rgba(255, 99, 132, 0.2)"
                    "rgba(54, 162, 235, 0.2)"
                    "rgba(255, 206, 86, 0.2)"
                    "rgba(75, 192, 192, 0.2)"
                    "rgba(153, 102, 255, 0.2)"
                    "rgba(255, 159, 64, 0.2)"
                ))
                (borderColor ($list
                    "rgba(255, 99, 132, 1)"
                    "rgba(54, 162, 235, 1)"
                    "rgba(255, 206, 86, 1)"
                    "rgba(75, 192, 192, 1)"
                    "rgba(153, 102, 255, 1)"
                    "rgba(255, 159, 64, 1)"
                ))
                (borderWidth 1)
            )))
        ))
        (options (#
            (scales (#
                (yAxes ($list (# (ticks (#
                    (beginAtZero true)
                )))))
            ))
        ))
    ))))
)


# Superscript / Subscript

* H~2~0
* 29^th^



# [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.



# Math (supported browsers: Firefix, Safari)

Pythagoran theorem is $$a^2 + b^2 = c^2$$.
 
Bayes theorem:
 
$$$
P(A | B) = (P(B | A)P(A)) / P(B)
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$


Pythagoran theorem is %%%(Math (@ (inline)) "d^2 + e^2 = f^2" ).

Bayes theorem:

%%%(Math """
Q(A | B) = (Q(B | A)Q(A)) / Q(B)
Q(A | B) = (Q(B | A)Q(A)) / Q(B)
""")

%%%(Math """
Q(A | B) = (Q(B | A)Q(A)) / Q(B)
""")

%%%(Math """
Q(A | B) = (Q(B | A)Q(A)) / Q(B)
""")

%%%(Math """
Q(A | B) = (Q(B | A)Q(A)) / Q(B)
""")

