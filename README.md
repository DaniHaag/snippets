snippets
========

code snippets and links

dev tool links  
--------------

* markdown cheatsheet https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet  
* javascript snippets  http://bgrins.github.io/devtools-snippets/|

Javascript snippets
-------------------

* encode unsafe text to be displaeyed as HTML
```javascript
var unsafeText ="<p>test</p>"
var div = document.createElement("div")
div.textContent = unsafeText;
var htmlEncodedString = div.innerHTML;
```


Excel snippets
--------------

### Excel VBA Functions

* Linkaddress returns the url saved in a hyperlink
```VB.net
Function LinkAddress(reference As Range)
 LinkAddress = ""
 If reference.Hyperlinks.Count > 0 Then
      'The cell contains a hyperlink
      LinkAddress = reference.Hyperlinks(1).Address
 End If
End Function
```


* Comment returns the comment of a cell if avalilable
```VB.net
Function Comment(reference As Range)
 Comment = ""
 If Not reference.Comment Is Nothing Then
      'The cell contains a hyperlink
      Comment = reference.Comment.Text
 End If
End Function
```

* Reverse the contents (eg to find the last / )
```VB.net
Option Explicit
Public Function Reverse(Text As String)
    Reverse = StrReverse(Text)
End Function
```

* calculate how many times the prime is in number (Primfaktorzerlegung)
```VB.net
Public Function CountMod(Number As Long, Prime As Long)
    Dim x As Integer
    x = 0
    CountMod = 0
    Do
        If Number Mod Prime = 0 Then
            Number = Number / Prime
            CountMod = CountMod + 1
        Else
            Exit Do
        End If
    Loop
End Function
```

* worksheet function to mark the current row in a specific color
```VB.net
Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    If Application.CutCopyMode = False Then
        ActiveSheet.Cells.Interior.ColorIndex = 0
        Target.EntireRow.Interior.ColorIndex = 36
    End If
End Sub
```

* worksheet function to check if the reference is in bold
```VB.net
Function IsBold(rCell As Range)
  IsBold = rCell.Font.Bold
End Function
```

###  ArrayFunctions

[http://www.cpearson.com/excel/ArrayFormulas.aspx]

### ScratchPad (special purpose no general use probably )
| description | code | 
|--|--|
| get part of the link from Masterfile Search | {{=MID(LinkAddress(A1);36;12)}} |
|make table from multiple rows (4 rows in this case) |=IF(AND(A1<>"";MOD(ROW(A1);4)=1);A1;"")|
|check for existence of a string value in an array of values (3 in example below)  \\Array funcition containing logical and \\ return value is a product of primes so you can exactly find out which values are in (MOD) and how often (divide as long mod(x) is 0) \\ col A contains a String to compare against (E8) and col D contains the actual |=PRODUCT(1;IF(($A$3:$A$300=E8)*($D$3:$D$300="high");3;IF(($A$3:$A$300=E8)*($D$3:$D$300="medium");2;1)))\\=PRODUCT(IF((Table1!$A$3:$A$300=E8);IF(Table1!$D$3:$D$300="low";2;1)*IF(Table1!$D$3:$D$300="medium";3;1)*IF(Table1!$D$3:$D$300="medium";5;1);FALSE))|
|exchange primes with text  \\ either prints high, or medium, falls back to low if n/a|=IF(MOD(L16;3)=0;"high";IF(MOD(L16;2)=0;"medium";"low"))|
|lookup max value from "low","medium","high"|=IF(MOD(PRODUCT(1;IF((Table1!$A$3:$A$300=E8)*(Table1!$D$3:$D$300="high");3;IF((Table1!$A$3:$A$300=E8)*(Table1!$D$3:$D$300="medium");2;1)));3)=0;"high";IF(MOD(PRODUCT(5;IF((Table1!$A$3:$A$300=E8)*(Table1!$D$3:$D$300="high");3;IF((Table1!$A$3:$A$300=E8)*(Table1!$D$3:$D$300="medium");2;1)));2)=0;"medium";"low"))|

# Windows Commandline

* recursively delete all files and folders
```
for /f %i in ('dir /s/a/b .*') do del %i /q/s
for /f %i in ('dir /s/a/b .*') do rmdir %i /q/s
```

* build all maven projects in a sub directory calle ...Build
```
for /f %i in ('dir /b/a:d *Build') do pushd . && cd %i & mvn clean install & cd popd
```
