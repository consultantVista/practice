let secDistrict = {
    array: [],
    getByName:function(x)
    {
        for (let i = 0; i < 26; i++)
        {
            if (this.array[i] === x)
            {
                return this.array[i];
            }
        }
    },
    getSeatsNumberByName:function(x)
    {
        let y = parseInt(0);
        for (let i = 0; i < 26; i++)
        {
            if (this.array[i].name == x)
            {
                y = y + this.array[i].Sunnites + this.array[i].Shiites + this.array[i].Druze + this.array[i].Alawites + this.array[i].Maronites + this.array[i].Orthodox + this.array[i].Catholics + this.array[i].Protestants + this.array[i].Minorities + this.array[i].Armenian_Orthodox + this.array[i].Armenian_Catholics;
                return y;
            }
        }
    },
    getSeatsDistributionByName:function(x)
    {
        let y = new Array;
        for (let i = 0; i < 26; i++)
        {
            if (this.array[i].name == x)
            {
                if(this.array[i].Sunnites != 0)
                {
                    y.push(["Sunnites", this.array[i].Sunnites]);
                }
                if(this.array[i].Shiites != 0)
                {
                    y.push(["Shiites", this.array[i].Shiites]);
                }
                if(this.array[i].Druze != 0)
                {
                    y.push(["Druze", this.array[i].Druze]);
                }
                if(this.array[i].Alawites != 0)
                {
                    y.push(["Alawites", this.array[i].Alawites]);
                }
                if(this.array[i].Maronites != 0)
                {
                    y.push(["Maronites", this.array[i].Maronites]);
                }
                if(this.array[i].Orthodox != 0)
                {
                    y.push(["Orthodox", this.array[i].Orthodox]);
                }
                if(this.array[i].Catholics != 0)
                {
                    y.push(["Catholics", this.array[i].Catholics]);
                }
                if(this.array[i].Protestants != 0)
                {
                    y.push(["Protestants", this.array[i].Protestants]);
                }
                if(this.array[i].Minorities != 0)
                {
                    y.push(["Minorities", this.array[i].Minorities]);
                }
                if(this.array[i].Armenian_Orthodox != 0)
                {
                    y.push(["Armenian_Orthodox", this.array[i].Armenian_Orthodox]);
                }
                if(this.array[i].Armenian_Catholics != 0)
                {
                    y.push(["Armenian_Catholics", this.array[i].Armenian_Catholics]);
                }
            }
        }
        return y;
    }
}

let district = {
    array: [],
    getByName:function(x)
    {
        for (let i = 0; i < 15; i++)
        {
            if (this.array[i].name == x)
            {
                return this.array[i];
            }
        }
    },
    getSeatsNumberByName:function(x)
    {
        let y = parseInt(0);
        for (let i = 0; i < 26; i++)
        {
            if (secDistrict.array[i].district == x)
            {
                y += secDistrict.getSeatsNumberByName(secDistrict.array[i].name);
            }
        }
        return y;
    },
    getSeatsDistributionByName:function(x)
    {
        let y = new Array;
        for (let i = 0; i < 26; i++)
        {
            if (secDistrict.array[i].district == x)
            {
                y.push(secDistrict.getSeatsDistributionByName(secDistrict.array[i].name));
            }
        }
        let z = new Array;
        let flag = false;
        for (let i = 0; i < y.length; i++)
        {
            for (let j = 0; j < y[i].length; j++)
            {
                for (let k = 0; k < z.length; k++)
                {
                    if (y[i][j][0] == z[k][0])
                    {
                        z[k][1] += parseInt(y[i][j][1]); 
                        flag = true;
                    }
                }
                if (flag == false)
                {
                    z.push([y[i][j][0], y[i][j][1]]);
                }
                flag = false;
            }
        }
        return z;
    },
    getSecDistrictDataByName:function(x)
    {
        let y = new Array;
        for (let i = 0; i < 26; i++)
        {
            if (secDistrict.array[i].district == x)
            {
                y.push([secDistrict.array[i].name, secDistrict.getSeatsDistributionByName(secDistrict.array[i].name)]);
            }
        }
        return y;
    }
}

let mainDistrict = {
    array: [],
    getDistrictsByName:function(x)
    {
        let y = new Array;
        for (let i = 0; i < 15; i++)
        {
            if (district.array[i].mainDistrict == x)
            {
                y.push(district.array[i].name);
            }
        }
        return y;
    }
}

let storedLists = {
    array: []
}