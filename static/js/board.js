let imageConfig = {
    "baseUrl": "/static/images/pieces/",
    "white_prefix": "w_",
    "black_prefix": "b_",
    "format": "svg"
}

function getPieceImage(color, piece) {
    let prefix = imageConfig[color + "_prefix"]
    return imageConfig["baseUrl"] + prefix + piece + "." + imageConfig["format"]
}

const chars = "ABCDEFGH"

class Cell {
    constructor(dom) {
        this.dom = dom
        this.id = dom.attr("data-id")
        this.row = this.id.split("")[1]
        this.column = chars.indexOf(this.id.split("")[0]) + 1
    }
    addPiece(color, piece) {
        this.dom.html("<img src='" + getPieceImage(color, piece) + "' class='piece'>")
        this.dom.attr("data-piece", piece)
    }
    removePiece() {
        this.dom.find(".piece").remove()
        this.dom.removeAttr("data-piece")
    }
}
class Board {
    constructor(board) {
        this.board = board
        this.cells = []
    }
    addListeners() {
        this.board.on("click", ".cell", function() {
            $(".cell").removeClass("active")
        })
        this.board.on("click", ".cell[data-piece]", function() {
            $(this).addClass("active")
        })
    }
    getCellId(cellCount) {
        let row = Math.ceil(cellCount / 8);
        if(row != 1) {
            cellCount = cellCount - (8 * (row - 1))
        }
        cellCount = Math.abs(cellCount - 8) + 1
        return chars[cellCount - 1] + row
    }
    getBoardCell(cellCount, reverse) {
        let row = Math.ceil(cellCount / 8);
        let cell = $("<div class='cell'></div>")
        if(reverse) {
            cellCount = Math.abs(cellCount - 64) + 1
        }
        cell.attr("data-id", this.getCellId(cellCount))
        if(row % 2 != 0) {
            if(cellCount % 2 == 0) {
                cell.addClass("dark")
            } else {
                cell.addClass("light")
            }
        } else {
            if(cellCount % 2 == 0) {
                cell.addClass("light")
            } else {
                cell.addClass("dark")
            }
        }
        return cell
    }
    build(side) {
        this.board.empty()
        for(let a = 1; a < 65; a++) {
            let cell = this.getBoardCell(a, side=="black")
            this.board.prepend(cell)
            this.cells.push(new Cell(cell))
        }
    }
    populate() {
        for(let a = 0; a < this.cells.length; a++) {
            let cell = this.cells[a]
            let id = cell.id
            let row = cell.row
            let column = cell.column
            let color = "white"
            if(row >= 7) {
                color = "black"
            }
            if(row == 2 || row == 7) {
                cell.addPiece(color, "pawn", id)
            }
            if(row == 1 || row == 8) {
                if(column == 1 || column == 8) {
                    cell.addPiece(color, "rook", id)
                }
                if(column == 2 || column == 7) {
                    cell.addPiece(color, "knight", id)
                }
                if(column == 3 || column == 6) {
                    cell.addPiece(color, "bishop", id)
                }
                if(column == 4) {
                    cell.addPiece(color, "queen", id)
                }
                if(column == 5) {
                    cell.addPiece(color, "king", id)
                }
            }
        }
    }
    init(side="white") {
        this.build(side)
        this.populate()
        this.addListeners()
    }
}