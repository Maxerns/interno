package main

import (
	"os"

	"github.com/wailsapp/wails/v3/pkg/application"
)

type FileService struct{}

func (s *FileService) OpenFolderDialog() (string, error) {
	path, err := application.Get().Dialog.OpenFile().
		SetTitle("Open Folder").
		CanChooseDirectories(true).
		CanChooseFiles(false).
		PromptForSingleSelection()

	return path, err

}

func (s *FileService) ReadDir(directoryName string) ([]string, error) {
    entries, err := os.ReadDir(directoryName)
    if err != nil {
        return nil, err
    }

    files := make([]string, 0, len(entries))
    for _, entry := range entries {
        files = append(files, entry.Name())
    }
    return files, nil
}

func (s *FileService) ReadFile(fileName string) (string, error) {
    data, err := os.ReadFile(fileName)
    if err != nil {
        return "", err
    }
    return string(data), nil
}

func (s *FileService) WriteFile(fileName, text string) error {
    return os.WriteFile(fileName, []byte(text), 0644)
}
