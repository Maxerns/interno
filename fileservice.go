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
	if err != nil && err.Error() == "cancelled by user" {
		return "", nil // user cancelled: normalise to macOS ("", nil) behaviour
	}

	return path, err

}

type DirEntry struct {
	Name  string `json:"name"`
	IsDir bool   `json:"isDir"`
}

func (s *FileService) ReadDir(directoryName string) ([]DirEntry, error) {
	entries, err := os.ReadDir(directoryName)
	if err != nil {
		return nil, err
	}

	files := make([]DirEntry, 0, len(entries))
	for _, entry := range entries {
		files = append(files, DirEntry{Name: entry.Name(), IsDir: entry.IsDir()})
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
