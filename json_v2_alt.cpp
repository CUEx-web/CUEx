// Gets only csv files
// g++ json.cpp -o json
//  ./json

#include <iostream>
#include <string>
#include <fstream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    // File pointer
    fstream fin;
    string filename1, filename2;
    cout << "Enter the source file name" << endl;
    cin >> filename1;
    filename1 += ".csv";
    fin.open(filename1, ios::in);
    cout << "Enter new file name" << endl;
    cin >> filename2;
    filename2 += ".json";
    ofstream myFile(filename2);
    string line, word, tmp;
    vector<string> row;
    vector<string> sqnce;
    vector<string> MAJOR;
    vector<string> uuidFromCSV;
    int correcter = 0;

    while (getline(fin, line))
    {
        row.clear();
        stringstream s(line);
        while (getline(s, word, ','))
        {
            row.push_back(word);
        }
        if (correcter < 1) {
            correcter++;
            continue;
        }
        if (correcter < 2) {
            sqnce.push_back(row[1]);
            uuidFromCSV.push_back(row[3]);
            MAJOR.push_back(row[4]);
            correcter++;
            continue;
        }
       if (sqnce.back() == row[1]) {
           continue;
       }
       sqnce.push_back(row[1]);
       uuidFromCSV.push_back(row[3]);
       MAJOR.push_back(row[4]);
    }
    myFile << "{" << endl;
    myFile << "\"devices\"" << ": " << "[" << endl;

    for (int i = 0; i < MAJOR.size(); i++) {
        myFile << "{" << endl;
        myFile << "\"alias\": \"ST" << i << "\"," << endl;
        myFile << "\"major\": " << MAJOR[i] << "," << endl;
        myFile << "\"minor\": " << "8529" << "," << endl;
        myFile << "\"uniqueId\": \"Trail" <<"\"," << endl;
        myFile << "\"duration\": " << "20.00" << "," << endl;
        myFile << "\"UUID\": \"" << uuidFromCSV[i] << "\"" << endl;
        if (i != MAJOR.size() - 1) {
            myFile << "}," << endl;
        }
        else {
            myFile << "}" << endl;
        }
    }

    myFile << "]," << endl;

    //
    myFile << "\"searchMeta\": {" << endl;
    myFile << "\"maxResult\": 999," << endl;
    myFile << "\"nextResults\": \"\"," << endl;
    myFile << "\"order\": \"ASC\"," << endl;
    myFile << "\"orderBy\": \"created\"," << endl;
    myFile << "\"prevResults\": \"\"," << endl;
    myFile << "\"startIndex\": 0" << endl;
    myFile << "}" << endl;
    //
    myFile << "}";


    return 0;
}
